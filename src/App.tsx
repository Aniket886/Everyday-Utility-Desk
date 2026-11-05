import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownToLine, ArrowRight, Camera, Check, ChevronRight, Copy, Download, FileInput, FileText, GraduationCap, Image as ImageIcon, Menu, QrCode, ScanLine, ShieldCheck, Sparkles, Upload, Video, X } from 'lucide-react';
import QRCode from 'qrcode';
import QrScanner from 'qr-scanner';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';
import JSZip from 'jszip';
import StudentSection from './StudentSection';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

type ToolId = 'qr-create' | 'qr-scan' | 'convert' | 'youtube' | 'students';
type Activity = { label: string; meta: string; time: string };

const tools = [
  { id: 'qr-create' as const, label: 'Create QR', short: 'QR', icon: QrCode, description: 'Turn text or links into a clean QR code.' },
  { id: 'qr-scan' as const, label: 'Scan QR', short: 'SCAN', icon: ScanLine, description: 'Read a QR code from a camera or image.' },
  { id: 'convert' as const, label: 'Convert files', short: 'FILE', icon: FileInput, description: 'Convert PDFs, images, text, and DOCX locally.' },
  { id: 'youtube' as const, label: 'Media download', short: 'MEDIA', icon: ArrowDownToLine, description: 'Save media you own or have permission to use.' },
  { id: 'students' as const, label: 'Student section', short: 'ACADEMIC', icon: GraduationCap, description: 'Explore 36 local tools plus program-based and official external resources.' },
];

function downloadBlob(blob: Blob, name: string) {
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = name;
  a.click();
  URL.revokeObjectURL(href);
}

function formatTime(seconds?: number) {
  if (!seconds) return '—';
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function App() {
  const [active, setActive] = useState<ToolId>('qr-create');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activity, setActivity] = useState<Activity[]>([]);
  const current = tools.find((tool) => tool.id === active)!;
  const addActivity = (label: string, meta: string) => setActivity((items) => [{ label, meta, time: new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date()) }, ...items].slice(0, 5));
  const chooseTool = (id: ToolId) => { setActive(id); setMenuOpen(false); };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}>
        <div className="brand-block">
          <div className="brand-mark"><span>ED</span></div>
          <div><strong>Everyday</strong><span>Utility Desk</span></div>
          <button className="icon-button sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>
        <p className="eyebrow nav-label">Your tools</p>
        <nav aria-label="Utility tools">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return <button key={tool.id} className={`nav-item ${active === tool.id ? 'active' : ''}`} onClick={() => chooseTool(tool.id)}><span className="nav-index">0{index + 1}</span><Icon size={19} strokeWidth={1.8} /><span>{tool.label}</span><ChevronRight className="nav-arrow" size={16} /></button>;
          })}
        </nav>
        <div className="privacy-note"><ShieldCheck size={18} /><div><strong>Private by default</strong><span>QR and file tools run in your browser.</span></div></div>
      </aside>

      <main className="main-stage">
        <header className="mobile-header"><button className="icon-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button><span>Everyday Utility Desk</span><span className="status-dot" title="Ready" /></header>
        <section className="workspace">
          <div className="workspace-heading">
            <div><p className="eyebrow">{current.short} / READY</p><h1>{current.label}</h1><p>{current.description}</p></div>
            <div className="local-badge"><span /> Local processing</div>
          </div>
          <div className="tool-surface" key={active}>
            {active === 'qr-create' && <QrGenerator onActivity={addActivity} />}
            {active === 'qr-scan' && <QrReader onActivity={addActivity} />}
            {active === 'convert' && <FileConverter onActivity={addActivity} />}
            {active === 'youtube' && <YouTubeDownloader onActivity={addActivity} />}
            {active === 'students' && <StudentSection onActivity={addActivity} />}
          </div>
        </section>
        <aside className="activity-rail">
          <div className="activity-head"><p className="eyebrow">Recent</p><span>{activity.length}</span></div>
          {activity.length === 0 ? <div className="activity-empty"><Sparkles size={21} /><p>Your finished tasks will appear here.</p></div> : activity.map((item, index) => <div className="activity-row" key={`${item.time}-${index}`}><span className="activity-check"><Check size={12} /></span><div><strong>{item.label}</strong><span>{item.meta}</span></div><time>{item.time}</time></div>)}
          <div className="rail-footer"><span>40 local tools</span><span>No account</span></div>
        </aside>
      </main>
    </div>
  );
}

function QrGenerator({ onActivity }: { onActivity: (a: string, b: string) => void }) {
  const [value, setValue] = useState('https://example.com');
  const [size, setSize] = useState(720);
  const [foreground, setForeground] = useState('#171714');
  const [background, setBackground] = useState('#ffffff');
  const [dataUrl, setDataUrl] = useState('');
  useEffect(() => {
    let valid = true;
    QRCode.toDataURL(value || ' ', { width: size, margin: 3, color: { dark: foreground, light: background }, errorCorrectionLevel: 'M' }).then((url) => valid && setDataUrl(url));
    return () => { valid = false; };
  }, [value, size, foreground, background]);
  const save = () => { const a = document.createElement('a'); a.href = dataUrl; a.download = 'everyday-qr.png'; a.click(); onActivity('QR downloaded', `${size} × ${size} PNG`); };
  return <div className="generator-layout">
    <div className="form-column">
      <label className="field-label" htmlFor="qr-content">Text or URL</label><textarea id="qr-content" value={value} onChange={(e) => setValue(e.target.value)} rows={6} placeholder="Paste a link or type any text…" />
      <div className="field-row">
        <label><span className="field-label">Foreground</span><span className="color-field"><input type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} /><code>{foreground}</code></span></label>
        <label><span className="field-label">Background</span><span className="color-field"><input type="color" value={background} onChange={(e) => setBackground(e.target.value)} /><code>{background}</code></span></label>
      </div>
      <label className="range-label"><span><span className="field-label">Output size</span><strong>{size} px</strong></span><input type="range" min="320" max="1200" step="40" value={size} onChange={(e) => setSize(Number(e.target.value))} /></label>
    </div>
    <div className="preview-column"><div className="qr-preview" style={{ background }}><img src={dataUrl} alt="Generated QR code preview" /></div><button className="primary-button" onClick={save} disabled={!dataUrl}><Download size={18} /> Download PNG <ArrowRight size={17} /></button><p className="microcopy">High-resolution PNG · updates live</p></div>
  </div>;
}

function QrReader({ onActivity }: { onActivity: (a: string, b: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [mode, setMode] = useState<'idle' | 'camera'>('idle');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  useEffect(() => () => { scannerRef.current?.destroy(); }, []);
  const acceptResult = (text: string) => { setResult(text); setError(''); onActivity('QR scanned', text.length > 34 ? `${text.slice(0, 34)}…` : text); };
  const startCamera = async () => {
    if (!videoRef.current) return;
    setError(''); setMode('camera');
    const scanner = new QrScanner(videoRef.current, (r) => { acceptResult(r.data); scanner.stop(); setMode('idle'); }, { highlightScanRegion: true, highlightCodeOutline: true });
    scannerRef.current = scanner;
    try { await scanner.start(); } catch { setMode('idle'); setError('Camera access was blocked or no camera is available. Upload an image instead.'); }
  };
  const scanFile = async (file?: File) => { if (!file) return; try { const found = await QrScanner.scanImage(file, { returnDetailedScanResult: true }); acceptResult(found.data); } catch { setError('No readable QR code was found. Try a sharper, well-lit image.'); } };
  return <div className="scanner-layout">
    <div className={`camera-stage ${mode === 'camera' ? 'live' : ''}`}><video ref={videoRef} muted playsInline />{mode === 'idle' && <div className="camera-placeholder"><div className="scan-glyph"><ScanLine size={46} /></div><strong>Ready to scan</strong><span>Use your camera or choose an image.</span></div>}<div className="corner tl" /><div className="corner tr" /><div className="corner bl" /><div className="corner br" /></div>
    <div className="scanner-actions"><button className="primary-button" onClick={startCamera} disabled={mode === 'camera'}><Camera size={18} /> {mode === 'camera' ? 'Camera active…' : 'Open camera'}</button><label className="secondary-button"><ImageIcon size={18} /> Scan an image<input type="file" accept="image/*" onChange={(e) => scanFile(e.target.files?.[0])} hidden /></label>{error && <p className="inline-error">{error}</p>}{result && <div className="result-panel"><p className="eyebrow">Decoded result</p><p>{result}</p><button onClick={() => navigator.clipboard.writeText(result)}><Copy size={15} /> Copy result</button></div>}</div>
  </div>;
}

function FileConverter({ onActivity }: { onActivity: (a: string, b: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState('');
  const options = useMemo(() => {
    if (!file) return [];
    if (file.type.startsWith('image/')) return ['PDF'];
    if (file.type === 'application/pdf') return ['PNG archive'];
    if (file.name.toLowerCase().endsWith('.docx')) return ['HTML', 'Plain text'];
    if (file.type.startsWith('text/') || file.name.toLowerCase().endsWith('.txt')) return ['PDF'];
    return [];
  }, [file]);
  const [target, setTarget] = useState('PDF');
  useEffect(() => { if (options.length) setTarget(options[0]); }, [file]);
  const convert = async () => {
    if (!file || !options.length) return;
    setBusy(true); setMessage('');
    try {
      const base = file.name.replace(/\.[^.]+$/, '');
      if (file.type.startsWith('image/')) {
        const pdf = await PDFDocument.create(); const bytes = await file.arrayBuffer();
        const image = file.type === 'image/png' ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
        const page = pdf.addPage([image.width, image.height]); page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        downloadBlob(new Blob([await pdf.save()], { type: 'application/pdf' }), `${base}.pdf`);
      } else if (file.type === 'application/pdf') {
        const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise; const zip = new JSZip();
        for (let pageNo = 1; pageNo <= doc.numPages; pageNo++) { const page = await doc.getPage(pageNo); const viewport = page.getViewport({ scale: 2 }); const canvas = document.createElement('canvas'); canvas.width = viewport.width; canvas.height = viewport.height; const context = canvas.getContext('2d')!; await page.render({ canvasContext: context, viewport }).promise; const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png')); zip.file(`${base}-page-${pageNo}.png`, blob); }
        downloadBlob(await zip.generateAsync({ type: 'blob' }), `${base}-pages.zip`);
      } else if (file.name.toLowerCase().endsWith('.docx')) {
        const buffer = await file.arrayBuffer();
        if (target === 'HTML') { const result = await mammoth.convertToHtml({ arrayBuffer: buffer }); downloadBlob(new Blob([`<!doctype html><meta charset="utf-8"><body>${result.value}</body>`], { type: 'text/html' }), `${base}.html`); }
        else { const result = await mammoth.extractRawText({ arrayBuffer: buffer }); downloadBlob(new Blob([result.value], { type: 'text/plain' }), `${base}.txt`); }
      } else {
        const text = await file.text(); const pdf = await PDFDocument.create(); const font = await pdf.embedFont(StandardFonts.Helvetica); const fontSize = 11, lineHeight = 16, width = 595, height = 842, margin = 48; const maxChars = 82; const lines = text.split(/\r?\n/).flatMap((line) => line.match(new RegExp(`.{1,${maxChars}}(?:\\s|$)|.{1,${maxChars}}`, 'g')) || ['']); let page = pdf.addPage([width, height]); let y = height - margin;
        for (const line of lines) { if (y < margin) { page = pdf.addPage([width, height]); y = height - margin; } page.drawText(line.trimEnd(), { x: margin, y, size: fontSize, font, color: rgb(.08, .08, .07) }); y -= lineHeight; }
        downloadBlob(new Blob([await pdf.save()], { type: 'application/pdf' }), `${base}.pdf`);
      }
      setMessage('Converted and downloaded.'); onActivity('File converted', `${file.name} → ${target}`);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Conversion failed. Check the file and try again.'); } finally { setBusy(false); }
  };
  const accept = (chosen?: File) => { if (chosen) { setFile(chosen); setMessage(''); } };
  return <div className="converter-layout">
    <label className={`drop-zone ${dragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); accept(e.dataTransfer.files[0]); }}><input type="file" accept=".pdf,.png,.jpg,.jpeg,.docx,.txt,text/plain,application/pdf,image/*" onChange={(e) => accept(e.target.files?.[0])} hidden />{file ? <><FileText size={34} /><strong>{file.name}</strong><span>{(file.size / 1024 / 1024).toFixed(2)} MB · click to replace</span></> : <><Upload size={34} /><strong>Drop a file here</strong><span>PDF, PNG, JPG, DOCX, or TXT · up to your browser’s memory limit</span><em>Choose file</em></>}</label>
    <div className="conversion-control"><div><p className="eyebrow">Output</p><h2>{file ? (options.length ? `Convert to ${target}` : 'Unsupported file') : 'Choose a file first'}</h2><p>Files stay on this device. Nothing is uploaded.</p></div>{options.length > 1 && <div className="segmented">{options.map((item) => <button className={target === item ? 'active' : ''} onClick={() => setTarget(item)} key={item}>{item}</button>)}</div>}<button className="primary-button" onClick={convert} disabled={!file || !options.length || busy}><ArrowDownToLine size={18} /> {busy ? 'Converting…' : 'Convert & download'}</button>{message && <p className={message.startsWith('Converted') ? 'success-message' : 'inline-error'}>{message}</p>}</div>
  </div>;
}

type VideoInfo = { title: string; channel: string; duration: number; thumbnail: string };
function YouTubeDownloader({ onActivity }: { onActivity: (a: string, b: string) => void }) {
  const [url, setUrl] = useState(''); const [info, setInfo] = useState<VideoInfo | null>(null); const [quality, setQuality] = useState('720'); const [authorized, setAuthorized] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState('');
  const inspect = async () => { setLoading(true); setError(''); setInfo(null); try { const response = await fetch('/api/youtube/info', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Could not inspect video.'); setInfo(data); } catch (e) { setError(e instanceof Error ? e.message : 'Could not inspect video.'); } finally { setLoading(false); } };
  const begin = () => { if (!authorized || !info) return; window.location.href = `/api/youtube/download?url=${encodeURIComponent(url)}&quality=${quality}`; onActivity('Media download started', quality === 'audio' ? 'MP3 audio' : `${quality === 'best' ? 'Best' : `${quality}p`} video`); };
  return <div className="media-layout">
    <div className="media-form"><div className="permission-banner"><ShieldCheck size={19} /><p><strong>Permission-only tool</strong><span>Use this only for videos you created, own, or are licensed to download. YouTube’s terms and local law still apply.</span></p></div><label className="field-label" htmlFor="video-url">YouTube URL</label><div className="url-row"><input id="video-url" type="url" value={url} onChange={(e) => { setUrl(e.target.value); setInfo(null); }} placeholder="https://www.youtube.com/watch?v=…" /><button onClick={inspect} disabled={!url || loading}>{loading ? 'Checking…' : 'Check video'}</button></div>{error && <p className="inline-error">{error}</p>}<div className="quality-list">{[['best', 'Best available', 'Largest file'], ['1080', '1080p', 'Full HD'], ['720', '720p', 'Balanced'], ['audio', 'Audio only', 'MP3']].map(([value, label, meta]) => <label key={value} className={quality === value ? 'selected' : ''}><input type="radio" name="quality" value={value} checked={quality === value} onChange={() => setQuality(value)} /><span><strong>{label}</strong><small>{meta}</small></span><Check size={16} /></label>)}</div><label className="authorization-check"><input type="checkbox" checked={authorized} onChange={(e) => setAuthorized(e.target.checked)} /><span>I confirm I have permission to download this media.</span></label></div>
    <div className="media-preview">{info ? <><div className="video-thumb"><img src={info.thumbnail} alt="Video thumbnail" /><span>{formatTime(info.duration)}</span></div><p className="eyebrow">Ready to download</p><h2>{info.title}</h2><p>{info.channel}</p><button className="primary-button" onClick={begin} disabled={!authorized}><Download size={18} /> Download {quality === 'audio' ? 'MP3' : 'video'}</button></> : <div className="media-empty"><Video size={42} /><strong>No video loaded</strong><span>Paste a URL to check its title, creator, and availability.</span></div>}</div>
  </div>;
}
