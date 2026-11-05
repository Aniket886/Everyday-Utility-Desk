import express from 'express';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import youtubeDl from 'youtube-dl-exec';

const app = express();
const port = Number(process.env.PORT || 4174);
const here = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: '32kb' }));

function validYouTubeUrl(value) {
  try {
    const url = new URL(value);
    return ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'music.youtube.com'].includes(url.hostname);
  } catch {
    return false;
  }
}

app.post('/api/youtube/info', async (req, res) => {
  const { url } = req.body ?? {};
  if (!validYouTubeUrl(url)) return res.status(400).json({ error: 'Enter a valid YouTube URL.' });
  try {
    const info = await youtubeDl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      skipDownload: true,
      preferFreeFormats: true,
    });
    res.json({
      title: info.title,
      channel: info.channel || info.uploader,
      duration: info.duration,
      thumbnail: info.thumbnail,
    });
  } catch (error) {
    res.status(502).json({ error: 'Could not inspect this video. It may be private, restricted, or unavailable.' });
  }
});

app.get('/api/youtube/download', async (req, res) => {
  const url = String(req.query.url || '');
  const quality = ['best', '1080', '720', 'audio'].includes(String(req.query.quality)) ? String(req.query.quality) : '720';
  if (!validYouTubeUrl(url)) return res.status(400).send('Invalid YouTube URL.');

  const jobDir = path.join(os.tmpdir(), `utility-desk-${randomUUID()}`);
  await fs.mkdir(jobDir, { recursive: true });
  const template = path.join(jobDir, '%(title).150B.%(ext)s');
  const format = quality === 'audio'
    ? 'bestaudio/best'
    : quality === 'best'
      ? 'bestvideo+bestaudio/best'
      : `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`;

  try {
    await youtubeDl(url, {
      output: template,
      format,
      noPlaylist: true,
      restrictFilenames: true,
      mergeOutputFormat: quality === 'audio' ? undefined : 'mp4',
      extractAudio: quality === 'audio',
      audioFormat: quality === 'audio' ? 'mp3' : undefined,
    });
    const files = await fs.readdir(jobDir);
    if (!files.length) throw new Error('No output file');
    const filePath = path.join(jobDir, files[0]);
    res.download(filePath, files[0], async () => {
      await fs.rm(jobDir, { recursive: true, force: true });
    });
  } catch {
    await fs.rm(jobDir, { recursive: true, force: true });
    if (!res.headersSent) res.status(502).send('Download failed. The video may be restricted or require sign-in.');
  }
});

app.use(express.static(path.join(here, 'dist')));
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(here, 'dist', 'index.html'));
});

app.listen(port, () => console.log(`Everyday Utility Desk server: http://localhost:${port}`));
