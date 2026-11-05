import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Braces, Calculator, Check, Clock3, Code2, Database, Download, ExternalLink, FileSearch, FileText, FlaskConical, GraduationCap, Image as ImageIcon, Library, Network, Play, Search, Upload } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

pdfjs.GlobalWorkerOptions.workerSrc ||= new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export type StudentLevel = 'bachelor' | 'master' | 'phd' | 'documentation';
type Processor = 'citation'|'table'|'stats'|'code'|'regex'|'json'|'timer'|'units'|'diff'|'markdown'|'bib'|'matrix'|'clean'|'method'|'chart'|'sql'|'writing'|'notes'|'planner'|'reading'|'pdf'|'ocr'|'survey'|'endpoint'|'cards'|'mapper'|'math'|'diagram'|'tasks'|'format'|'outline'|'readme'|'sop'|'meeting'|'changelog'|'requirements';
type Tool = { id:string; level:StudentLevel; name:string; description:string; processor:Processor; placeholder:string; starter:string; action:string; network?:boolean };

const studentTools: Tool[] = [
  {id:'source-format-composer',level:'bachelor',name:'Source Format Composer',description:'Build structured academic references from source details.',processor:'citation',placeholder:'Author | Year | Title | Publisher or Journal',starter:'A. Researcher | 2026 | Methods for Local Scholarship | University Press',action:'Compose reference'},
  {id:'delimited-table-reader',level:'bachelor',name:'Delimited Table Reader',description:'Inspect CSV or TSV data with row and column summaries.',processor:'table',placeholder:'name,score\nAda,91\nLin,88',starter:'name,score,course\nAda,91,Statistics\nLin,88,Methods\nSam,94,Programming',action:'Inspect table'},
  {id:'numeric-summary-bench',level:'bachelor',name:'Numeric Summary Bench',description:'Calculate descriptive statistics from a numeric series.',processor:'stats',placeholder:'12, 18, 21, 21, 25',starter:'12, 18, 21, 21, 25, 30, 34',action:'Calculate summary'},
  {id:'browser-code-practice',level:'bachelor',name:'Browser Code Practice',description:'Run a small HTML, CSS, and JavaScript exercise locally.',processor:'code',placeholder:'<!doctype html>…',starter:'<!doctype html>\n<style>body{font:16px system-ui;padding:24px;background:#111;color:#eee}button{padding:10px}</style>\n<h1>Practice page</h1>\n<button onclick="document.querySelector(\'p\').textContent=\'It works.\'">Run</button>\n<p>Ready.</p>',action:'Run preview'},
  {id:'expression-pattern-lab',level:'bachelor',name:'Expression Pattern Lab',description:'Test a regular expression and inspect its matches.',processor:'regex',placeholder:'First line: expression\nRemaining lines: sample text',starter:'\\b[A-Z][a-z]+\\b\nAda and Lin are reviewing Research Methods.',action:'Find matches'},
  {id:'object-structure-examiner',level:'bachelor',name:'Object Structure Examiner',description:'Validate, format, and inspect structured JSON.',processor:'json',placeholder:'{"course":"Methods","credits":4}',starter:'{"course":"Methods","credits":4,"topics":["evidence","analysis"]}',action:'Validate & format'},
  {id:'focus-interval-clock',level:'bachelor',name:'Focus Interval Clock',description:'Run a focused study interval with local session tracking.',processor:'timer',placeholder:'25',starter:'25',action:'Start interval'},
  {id:'crossunit-calculation-sheet',level:'bachelor',name:'CrossUnit Calculation Sheet',description:'Convert common scientific and everyday measurements.',processor:'units',placeholder:'value | from | to\nExamples: 10 | km | mi',starter:'10 | km | mi',action:'Convert value'},
  {id:'draft-change-reader',level:'bachelor',name:'Draft Change Reader',description:'Compare two drafts at line level.',processor:'diff',placeholder:'First draft\n---\nSecond draft',starter:'The study uses a small sample.\nResults are preliminary.\n---\nThe study uses a stratified sample.\nResults require further validation.',action:'Compare drafts'},
  {id:'markup-equation-notebook',level:'bachelor',name:'Markup Equation Notebook',description:'Write Markdown notes and preview safe formatted output.',processor:'markdown',placeholder:'# Notes\n\nWrite **Markdown** here.',starter:'# Research note\n\nThe central relationship is **evidence → claim → conclusion**.\n\n- Record assumptions\n- Verify sources',action:'Render notebook'},
  {id:'reference-key-curator',level:'master',name:'Reference Key Curator',description:'Inspect bibliography entries and duplicate citation keys.',processor:'bib',placeholder:'@article{key, title={...}}',starter:'@article{lee2026,\n  title={Local Research Workflows},\n  author={Lee, A.},\n  year={2026}\n}',action:'Review records'},
  {id:'crossstudy-evidence-matrix',level:'master',name:'CrossStudy Evidence Matrix',description:'Structure evidence across studies for comparison.',processor:'matrix',placeholder:'Study | Method | Finding | Limitation',starter:'Study A | Survey | Strong association | Small sample\nStudy B | Experiment | Moderate effect | Short duration',action:'Build matrix'},
  {id:'tabular-cleanup-workshop',level:'master',name:'Tabular Cleanup Workshop',description:'Trim, normalize, and remove duplicate table rows.',processor:'clean',placeholder:'name,group\n Ada , A\nAda,A',starter:'name,group\n Ada , A\nLin,B\nAda,A\n Sam , B ',action:'Clean table'},
  {id:'method-choice-navigator',level:'master',name:'Method Choice Navigator',description:'Get a transparent starting point for a common statistical method.',processor:'method',placeholder:'Describe variables, groups, and research question.',starter:'I have two independent groups and one continuous outcome. I want to compare their averages.',action:'Suggest method'},
  {id:'research-figure-workshop',level:'master',name:'Research Figure Workshop',description:'Create a simple accessible bar figure from labeled values.',processor:'chart',placeholder:'Category | Value',starter:'Control | 14\nTreatment A | 22\nTreatment B | 18',action:'Build figure'},
  {id:'local-query-database-lab',level:'master',name:'Local Query Database Lab',description:'Run SQL against an in-browser sample dataset.',processor:'sql',placeholder:'SELECT * FROM students WHERE score >= 90',starter:'SELECT course, AVG(score) AS average_score\nFROM students\nGROUP BY course',action:'Run query'},
  {id:'scholarly-clarity-review',level:'master',name:'Scholarly Clarity Review',description:'Review deterministic writing metrics without hosted AI.',processor:'writing',placeholder:'Paste academic prose…',starter:'This study examines local research workflows. The results indicate that transparent processing improves confidence. Further investigation is required.',action:'Review clarity'},
  {id:'citation-anchored-notes',level:'master',name:'Citation Anchored Notes',description:'Keep local notes with source and page references.',processor:'notes',placeholder:'Source key: lee2026\nPage: 12\nNote: …',starter:'Source: lee2026\nPage: 12\nNote: Local processing improves privacy for unpublished material.',action:'Save note'},
  {id:'degree-milestone-scheduler',level:'master',name:'Degree Milestone Scheduler',description:'Sort academic milestones and deadlines.',processor:'planner',placeholder:'YYYY-MM-DD | milestone',starter:'2026-11-20 | Submit literature matrix\n2026-12-05 | Methods review\n2027-01-15 | Draft chapter',action:'Build schedule'},
  {id:'reading-course-ledger',level:'master',name:'Reading Course Ledger',description:'Track reading status, priority, and source metadata locally.',processor:'reading',placeholder:'Status | Author | Title',starter:'Reading | Lee | Local Research Workflows\nTo read | Kumar | Reproducible Analysis\nComplete | Chen | Evidence Design',action:'Update ledger'},
  {id:'document-margin-extractor',level:'phd',name:'Document Margin Extractor',description:'Extract PDF annotations and page references locally.',processor:'pdf',placeholder:'Choose an annotated PDF.',starter:'',action:'Extract annotations'},
  {id:'scanned-corpus-transcriber',level:'phd',name:'Scanned Corpus Transcriber',description:'Run local OCR on an image of printed text.',processor:'ocr',placeholder:'Choose an image.',starter:'',action:'Transcribe image'},
  {id:'survey-pattern-review',level:'phd',name:'Survey Pattern Review',description:'Summarize categorical survey response frequencies.',processor:'survey',placeholder:'respondent,satisfaction\n1,Agree',starter:'respondent,satisfaction,group\n1,Agree,A\n2,Strongly agree,A\n3,Neutral,B\n4,Agree,B\n5,Agree,A',action:'Review responses'},
  {id:'endpoint-exchange-desk',level:'phd',name:'Endpoint Exchange Desk',description:'Send an authorized HTTP request and inspect the response.',processor:'endpoint',placeholder:'{"url":"https://api.example.com","method":"GET"}',starter:'{"url":"https://jsonplaceholder.typicode.com/todos/1","method":"GET"}',action:'Send request',network:true},
  {id:'recall-schedule-decks',level:'phd',name:'Recall Schedule Decks',description:'Turn question-answer pairs into a local review deck.',processor:'cards',placeholder:'Question | Answer',starter:'What is a null hypothesis? | A claim tested for possible rejection.\nWhat is a confidence interval? | A range estimate for a population parameter.',action:'Prepare deck'},
  {id:'knowledge-relation-mapper',level:'phd',name:'Knowledge Relation Mapper',description:'Map directed relationships among research concepts.',processor:'mapper',placeholder:'Evidence -> Claim',starter:'Evidence -> Claim\nClaim -> Conclusion\nMethod -> Evidence\nLimitation -> Conclusion',action:'Map relations'},
  {id:'symbolic-matrix-workbench',level:'phd',name:'Symbolic Matrix Workbench',description:'Evaluate mathematical expressions and matrix operations locally.',processor:'math',placeholder:'det([[1,2],[3,4]])',starter:'det([[1, 2], [3, 4]])',action:'Evaluate expression'},
  {id:'research-process-diagrammer',level:'phd',name:'Research Process Diagrammer',description:'Render a Mermaid research process diagram locally.',processor:'diagram',placeholder:'flowchart LR\nA[Question] --> B[Method]',starter:'flowchart LR\n  A[Research question] --> B[Method]\n  B --> C[Evidence]\n  C --> D[Analysis]\n  D --> E[Conclusion]',action:'Render diagram'},
  {id:'dissertation-task-ledger',level:'phd',name:'Dissertation Task Ledger',description:'Summarize dissertation tasks by workflow status.',processor:'tasks',placeholder:'Status | Task',starter:'Backlog | Validate instrument\nIn progress | Draft methods chapter\nReview | Literature synthesis\nComplete | Ethics training',action:'Summarize ledger'},
  {id:'code-layout-refiner',level:'phd',name:'Code Layout Refiner',description:'Format JavaScript locally and compare clean output.',processor:'format',placeholder:'const result={value:1};',starter:'const study={title:"Local methods",sample:[12,18,21],active:true};\nfunction mean(values){return values.reduce((a,b)=>a+b,0)/values.length}',action:'Format source'},
  {id:'document-outline-planner',level:'documentation',name:'Document Outline Planner',description:'Turn section ideas into a numbered academic document structure.',processor:'outline',placeholder:'Section | purpose',starter:'Introduction | Define the problem and scope\nLiterature review | Synthesize prior work\nMethod | Explain design, sample, and analysis\nResults | Present findings\nDiscussion | Interpret findings and limitations',action:'Build outline'},
  {id:'project-readme-blueprint',level:'documentation',name:'Project README Blueprint',description:'Generate a structured README for an academic or programming project.',processor:'readme',placeholder:'Project | purpose | setup command',starter:'Local Survey Analysis | Explore anonymized questionnaire responses | npm install && npm run dev',action:'Build README'},
  {id:'procedure-structure-builder',level:'documentation',name:'Procedure Structure Builder',description:'Convert ordered actions into a clear standard operating procedure.',processor:'sop',placeholder:'One procedure step per line',starter:'Confirm the dataset is anonymized\nCreate a read-only backup\nValidate column types\nRun the approved analysis\nExport results with a timestamp',action:'Build procedure'},
  {id:'meeting-record-formatter',level:'documentation',name:'Meeting Record Formatter',description:'Format topics, decisions, owners, and due dates into meeting minutes.',processor:'meeting',placeholder:'Topic | decision | owner | due date',starter:'Literature scope | Include studies from 2020 onward | A. Researcher | 2026-11-15\nPilot sample | Recruit 20 participants | M. Student | 2026-11-22',action:'Format minutes'},
  {id:'change-record-curator',level:'documentation',name:'Change Record Curator',description:'Organize additions, changes, fixes, and removals into a release record.',processor:'changelog',placeholder:'Added | description',starter:'Added | Student program directory\nChanged | Improved dark-theme contrast\nFixed | SQL sample dataset initialization',action:'Build change record'},
  {id:'requirements-brief-builder',level:'documentation',name:'Requirements Brief Builder',description:'Convert needs and acceptance conditions into a concise requirements brief.',processor:'requirements',placeholder:'Need | reason | acceptance condition',starter:'Offline analysis | Protect unpublished data | No file contents leave the browser\nKeyboard access | Support all students | Every action works without a pointer',action:'Build brief'},
];

const levelCopy: Record<StudentLevel,{label:string;description:string}> = {
  bachelor:{label:'Bachelor',description:'Foundational coursework, data literacy, programming practice, and study utilities.'},
  master:{label:'Master',description:'Structured research, analysis, technical writing, and academic planning.'},
  phd:{label:'PhD',description:'Evidence extraction, advanced workflows, and dissertation execution.'},
  documentation:{label:'Documentation',description:'Structured outlines, project guides, procedures, meeting records, change records, and requirements.'},
};

const academicLevels: StudentLevel[] = ['bachelor','master','phd'];
type DirectoryView = 'levels'|'documentation'|'programs'|'external';
type ExternalResource = {id:string;name:string;description:string;url:string;note:string;programs:string[];image?:boolean};

const externalResources: ExternalResource[] = [
  {id:'image-creator',name:'Bing Image Creator',description:'Generate images from text prompts for presentations, reports, and concept development.',url:'https://www.bing.com/images/create',note:'External AI service · guest limits or free Microsoft account',programs:['computer-science','data-science','engineering','business','health-sciences','humanities','research'],image:true},
  {id:'zotero',name:'Zotero',description:'Full reference collection, PDF annotation, citation, and bibliography management.',url:'https://www.zotero.org/download/',note:'External desktop software · free and open source',programs:['health-sciences','humanities','research']},
  {id:'overleaf',name:'Overleaf',description:'Collaborative LaTeX writing and compilation for technical documents.',url:'https://www.overleaf.com/',note:'External cloud service · free plan available',programs:['computer-science','data-science','engineering','health-sciences','research']},
  {id:'jupyter',name:'JupyterLab',description:'Notebook environment for larger Python, data, and reproducible-computation projects.',url:'https://jupyter.org/install',note:'External local installation · free and open source',programs:['computer-science','data-science','engineering','health-sciences']},
  {id:'rstudio',name:'RStudio Desktop',description:'Full R development environment for statistical analysis and research reporting.',url:'https://docs.posit.co/ide/user/download.html',note:'External local installation · open-source edition',programs:['data-science','business','health-sciences','research']},
  {id:'qgis',name:'QGIS',description:'Desktop geographic information system for spatial analysis and mapping.',url:'https://qgis.org/download/',note:'External local installation · free and open source',programs:['data-science','engineering','business','humanities','research']},
  {id:'freecad',name:'FreeCAD',description:'Parametric 3D CAD for engineering, technical drawing, and physical design.',url:'https://www.freecad.org/downloads.php',note:'External local installation · free and open source',programs:['engineering']},
  {id:'blender',name:'Blender',description:'Full 3D modelling, rendering, animation, and scientific visualization suite.',url:'https://www.blender.org/download/',note:'External local installation · free and open source',programs:['computer-science','engineering','humanities']},
  {id:'diagrams',name:'diagrams.net',description:'Full visual diagram editor for UML, networks, processes, and complex layouts.',url:'https://app.diagrams.net/',note:'External web app · free · desktop version available',programs:['computer-science','data-science','engineering','business','health-sciences','humanities','research']},
  {id:'krita',name:'Krita',description:'Professional illustration and digital painting for academic visuals and design work.',url:'https://krita.org/en/download/',note:'External local installation · free and open source',programs:['humanities']},
];

const programs = [
  {id:'computer-science',label:'Computer Science & IT',description:'Programming, APIs, data structures, databases, and technical documentation.',tools:['browser-code-practice','expression-pattern-lab','object-structure-examiner','local-query-database-lab','endpoint-exchange-desk','code-layout-refiner','project-readme-blueprint','requirements-brief-builder']},
  {id:'data-science',label:'Data Science & Statistics',description:'Data inspection, cleaning, statistics, visualization, surveys, and reproducible work.',tools:['delimited-table-reader','numeric-summary-bench','tabular-cleanup-workshop','method-choice-navigator','research-figure-workshop','local-query-database-lab','survey-pattern-review','symbolic-matrix-workbench']},
  {id:'engineering',label:'Engineering & Technology',description:'Calculation, programming, diagrams, procedures, data, and technical project work.',tools:['crossunit-calculation-sheet','symbolic-matrix-workbench','browser-code-practice','research-process-diagrammer','delimited-table-reader','procedure-structure-builder','project-readme-blueprint','requirements-brief-builder']},
  {id:'business',label:'Business & Management',description:'Planning, quantitative summaries, reporting, decisions, and project documentation.',tools:['numeric-summary-bench','research-figure-workshop','degree-milestone-scheduler','reading-course-ledger','meeting-record-formatter','change-record-curator','requirements-brief-builder']},
  {id:'health-sciences',label:'Health & Life Sciences',description:'Evidence review, statistical decisions, surveys, references, and document extraction.',tools:['source-format-composer','reference-key-curator','crossstudy-evidence-matrix','method-choice-navigator','research-figure-workshop','survey-pattern-review','document-margin-extractor','scanned-corpus-transcriber']},
  {id:'humanities',label:'Humanities & Social Sciences',description:'Sources, qualitative notes, reading, writing, revisions, and research documentation.',tools:['source-format-composer','citation-anchored-notes','reading-course-ledger','scholarly-clarity-review','draft-change-reader','scanned-corpus-transcriber','document-outline-planner','meeting-record-formatter']},
  {id:'research',label:'Research, Thesis & Dissertation',description:'End-to-end evidence, writing, analysis, diagrams, milestones, and dissertation control.',tools:['reference-key-curator','crossstudy-evidence-matrix','citation-anchored-notes','document-margin-extractor','research-process-diagrammer','dissertation-task-ledger','document-outline-planner','requirements-brief-builder']},
];

export default function StudentSection({onActivity}:{onActivity:(a:string,b:string)=>void}){
  const [level,setLevel]=useState<StudentLevel>('bachelor');
  const [view,setView]=useState<DirectoryView>('levels');
  const [programId,setProgramId]=useState(programs[0].id);
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState<string|null>(null);
  const tool=studentTools.find(t=>t.id===selected);
  const activeProgram=programs.find(program=>program.id===programId)!;
  const filtered=useMemo(()=>studentTools.filter(t=>{
    if(query) return `${t.name} ${t.description} ${t.level}`.toLowerCase().includes(query.toLowerCase());
    if(view==='documentation') return t.level==='documentation';
    if(view==='programs') return activeProgram.tools.includes(t.id);
    return t.level===level;
  }),[level,query,view,activeProgram]);
  if(tool) return <StudentToolWorkspace tool={tool} onBack={()=>setSelected(null)} onActivity={onActivity}/>;
  return <div className="student-hub">
    <div className="student-intro"><div><p className="eyebrow">Student section / {studentTools.length} local tools</p><h2>Academic workbench</h2><p>Browse by academic stage, documentation task, or program—and use official external resources for heavyweight work.</p></div><GraduationCap size={34}/></div>
    <div className="section-switcher" role="tablist" aria-label="Student tool directories">
      {[['levels','Academic levels',GraduationCap],['documentation','Documentation',FileText],['programs','Programs & courses',Library],['external','External resources',ExternalLink]].map(([id,label,Icon])=><button key={String(id)} role="tab" aria-selected={view===id} className={view===id?'active':''} onClick={()=>{setView(id as DirectoryView);setQuery('')}}><Icon size={16}/>{String(label)}</button>)}
    </div>
    {view!=='external'&&<label className="student-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${studentTools.length} tools…`} aria-label="Search student tools"/><kbd>Ctrl K</kbd></label>}
    {!query&&view==='levels'&&<div className="level-tabs" role="tablist">{academicLevels.map(key=><button role="tab" aria-selected={level===key} className={level===key?'active':''} onClick={()=>setLevel(key)} key={key}><strong>{levelCopy[key].label}</strong><span>10 tools</span></button>)}</div>}
    {!query&&view==='programs'&&<div className="program-selector">{programs.map(program=><button className={program.id===programId?'active':''} onClick={()=>setProgramId(program.id)} key={program.id}><strong>{program.label}</strong><span>{program.description}</span></button>)}</div>}
    {view==='external' ? <ExternalResourceList resources={externalResources}/> : <>
      <div className="level-summary"><div><p className="eyebrow">{query?'Search results':view==='documentation'?'Documentation tools':view==='programs'?activeProgram.label:`${levelCopy[level].label} tools`}</p><p>{query?`${filtered.length} matching tools`:view==='documentation'?levelCopy.documentation.description:view==='programs'?activeProgram.description:levelCopy[level].description}</p></div><span>{String(filtered.length).padStart(2,'0')}</span></div>
      <ToolDirectory tools={filtered} onSelect={setSelected}/>
      {!query&&view==='programs'&&<ExternalResourceList resources={externalResources.filter(resource=>resource.programs.includes(programId))} compact title="Recommended external resources"/>}
    </>}
  </div>;
}

function ToolDirectory({tools,onSelect}:{tools:Tool[];onSelect:(id:string)=>void}){
  return <div className="tool-directory">{tools.map((item,index)=>{const Icon=iconFor(item.processor);return <button className="tool-directory-row" onClick={()=>onSelect(item.id)} key={item.id}><span className="directory-index">{String(index+1).padStart(2,'0')}</span><Icon size={18}/><span className="directory-copy"><strong>{item.name}</strong><small>{item.description}</small></span><span className="local-state">{item.network?<Network size={13}/>:<Check size={13}/>} {item.network?'Network':'Local'}</span><ArrowRight size={17}/></button>})}</div>
}

function ExternalResourceList({resources,compact=false,title='Official external resources'}:{resources:ExternalResource[];compact?:boolean;title?:string}){
  return <section className={`external-resources ${compact?'compact':''}`}><div className="external-heading"><div><p className="eyebrow">{title}</p><p>{compact?'These larger tools are maintained by their official providers.':'External destinations open in a new tab. Review account, privacy, and institutional rules before uploading work.'}</p></div><span>{String(resources.length).padStart(2,'0')}</span></div><div className="external-list">{resources.map(resource=><a href={resource.url} target="_blank" rel="noopener noreferrer" className={resource.image?'image-resource':''} key={resource.id}>{resource.image?<ImageIcon size={19}/>:<ExternalLink size={18}/>}<span><strong>{resource.name}</strong><small>{resource.description}</small><em>{resource.note}</em></span><ExternalLink size={15}/></a>)}</div></section>
}

function iconFor(processor:Processor){
  if(['outline','readme','sop','meeting','changelog','requirements'].includes(processor)) return FileText;
  if(['table','stats','clean','chart','survey','sql'].includes(processor)) return Database;
  if(['code','regex','json','format','endpoint'].includes(processor)) return Code2;
  if(['math','units'].includes(processor)) return Calculator;
  if(['pdf','ocr'].includes(processor)) return FileSearch;
  if(['timer','planner','reading','tasks','cards'].includes(processor)) return Clock3;
  if(['method','matrix','mapper','diagram'].includes(processor)) return FlaskConical;
  return BookOpen;
}

function StudentToolWorkspace({tool,onBack,onActivity}:{tool:Tool;onBack:()=>void;onActivity:(a:string,b:string)=>void}){
  const storageKey=`eud.student.${tool.id}`;
  const [input,setInput]=useState(()=>localStorage.getItem(storageKey) ?? tool.starter);
  const [result,setResult]=useState(''); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
  useEffect(()=>{localStorage.setItem(storageKey,input)},[input,storageKey]);
  const run=async()=>{setBusy(true);setError('');try{const output=await processTool(tool.processor,input);setResult(output);onActivity(`${tool.name} completed`,tool.level);}catch(e){setError(e instanceof Error?e.message:'The operation could not be completed.');}finally{setBusy(false)}};
  if(tool.processor==='timer') return <TimerWorkspace tool={tool} onBack={onBack} onActivity={onActivity}/>;
  if(tool.processor==='pdf'||tool.processor==='ocr') return <FileWorkspace tool={tool} onBack={onBack} onActivity={onActivity}/>;
  return <div className="student-workspace">
    <button className="back-button" onClick={onBack}><ArrowLeft size={16}/> All {levelCopy[tool.level].label} tools</button>
    <div className="student-tool-heading"><div><p className="eyebrow">{levelCopy[tool.level].label} / {tool.network?'Network':'Local'} workspace</p><h2>{tool.name}</h2><p>{tool.description}</p></div><span className="privacy-chip">{tool.network?<Network size={13}/>:<Check size={13}/>} {tool.network?'Network request':'No API key'}</span></div>
    <div className="student-work-grid">
      <div className="student-input-pane"><label className="field-label" htmlFor={`input-${tool.id}`}>Workspace input</label><textarea id={`input-${tool.id}`} value={input} onChange={e=>setInput(e.target.value)} placeholder={tool.placeholder} rows={16}/><div className="workspace-actions"><button className="run-button" onClick={run} disabled={busy||!input.trim()}><Play size={16}/>{busy?'Processing…':tool.action}</button><button onClick={()=>{setInput(tool.starter);setResult('');setError('')}}>Reset example</button></div><p className="autosave-note">Draft saved locally in this browser.</p></div>
      <div className="student-output-pane"><div className="output-head"><span>Output</span>{result&&<button onClick={()=>downloadText(result,`${tool.id}.txt`)}><Download size={15}/> Export</button>}</div>{error?<p className="inline-error" role="alert">{error}</p>:result?<ToolOutput processor={tool.processor} result={result}/>:<div className="output-empty"><Braces size={28}/><strong>Ready for input</strong><span>Run the workspace to generate a local result.</span></div>}</div>
    </div>
  </div>;
}

function ToolOutput({processor,result}:{processor:Processor;result:string}){
  if(processor==='code') return <iframe className="code-preview" sandbox="allow-scripts" srcDoc={result} title="Code preview"/>;
  if(processor==='markdown'||processor==='diagram') return <div className="rendered-output" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(result,{USE_PROFILES:{html:true,svg:true}})}}/>;
  return <pre className="text-output">{result}</pre>;
}

async function processTool(kind:Processor,input:string):Promise<string>{
  const lines=input.trim().split(/\r?\n/);
  switch(kind){
    case 'citation': {const [author='Unknown author',year='n.d.',title='Untitled',source='']=input.split('|').map(s=>s.trim());return `${author} (${year}). ${title}. ${source}.`.replace(/\s+\./g,'.')}
    case 'table': return inspectTable(input);
    case 'stats': return numericSummary(input);
    case 'code': return input;
    case 'regex': {const [pattern,...text]=lines;const rx=new RegExp(pattern,'g');const matches=[...text.join('\n').matchAll(rx)];return matches.length?matches.map((m,i)=>`${i+1}. “${m[0]}” at index ${m.index}`).join('\n'):'No matches found.'}
    case 'json': return JSON.stringify(JSON.parse(input),null,2);
    case 'units': return convertUnit(input);
    case 'diff': return compareDrafts(input);
    case 'markdown': return marked.parse(input) as string;
    case 'bib': {const keys=[...input.matchAll(/@\w+\s*\{\s*([^,\s]+)/g)].map(m=>m[1]);const duplicate=keys.filter((k,i)=>keys.indexOf(k)!==i);return `Records: ${keys.length}\nKeys: ${keys.join(', ')||'None detected'}\nDuplicates: ${[...new Set(duplicate)].join(', ')||'None'}`}
    case 'matrix': return toMarkdownTable(lines.map(l=>l.split('|').map(s=>s.trim())),['Study','Method','Finding','Limitation']);
    case 'clean': return [...new Set(lines.map((l,i)=>i===0?l:l.split(',').map(v=>v.trim()).join(',')))].join('\n');
    case 'method': return chooseMethod(input);
    case 'chart': return barFigure(input);
    case 'sql': {const mod=await import('alasql');const alasql=(mod.default??mod) as unknown as ((q:string,p?:unknown[])=>unknown);const students=[{name:'Ada',course:'Methods',score:91},{name:'Lin',course:'Methods',score:88},{name:'Sam',course:'Programming',score:94},{name:'Noor',course:'Programming',score:86}];const query=input.replace(/\bFROM\s+students\b/i,'FROM ?');return JSON.stringify(alasql(query,[students]),null,2)}
    case 'writing': return writingReview(input);
    case 'notes': localStorage.setItem('eud.student.notes',input);return `Note saved locally.\n\n${input}`;
    case 'planner': return lines.sort().map((l,i)=>`${i+1}. ${l}`).join('\n');
    case 'reading': return summarizeStatuses(lines);
    case 'survey': return surveySummary(input);
    case 'endpoint': {const request=JSON.parse(input);const started=performance.now();const response=await fetch(request.url,{method:request.method||'GET',headers:request.headers,body:['GET','HEAD'].includes((request.method||'GET').toUpperCase())?undefined:JSON.stringify(request.body)});const body=await response.text();return `Status: ${response.status} ${response.statusText}\nTime: ${Math.round(performance.now()-started)} ms\nContent-Type: ${response.headers.get('content-type')||'unknown'}\n\n${body.slice(0,20000)}`}
    case 'cards': return lines.map((l,i)=>{const [q,a]=l.split('|').map(s=>s.trim());return `Card ${i+1}\nQ: ${q}\nA: ${a||'—'}\nNext review: ${new Date(Date.now()+(i+1)*86400000).toLocaleDateString()}`}).join('\n\n');
    case 'mapper': {const edges=lines.map(l=>l.split('->').map(s=>s.trim()));const nodes=[...new Set(edges.flat())];return `Concepts (${nodes.length}): ${nodes.join(', ')}\n\nRelations\n${edges.map(([a,b])=>`• ${a} → ${b}`).join('\n')}`}
    case 'math': {const {evaluate}=await import('mathjs');const value=evaluate(input);return typeof value==='object'&&value?.toString?value.toString():String(value)}
    case 'diagram': {const {default:mermaid}=await import('mermaid');mermaid.initialize({startOnLoad:false,theme:'dark',securityLevel:'strict'});const {svg}=await mermaid.render(`diagram-${Date.now()}`,input);return svg}
    case 'tasks': return summarizeStatuses(lines);
    case 'format': {const prettier=await import('prettier/standalone');const babel=await import('prettier/plugins/babel');const estree=await import('prettier/plugins/estree');return prettier.format(input,{parser:'babel',plugins:[babel,estree],semi:true,singleQuote:true})}
    case 'outline': return buildOutline(lines);
    case 'readme': return buildReadme(input);
    case 'sop': return buildProcedure(lines);
    case 'meeting': return buildMeetingRecord(lines);
    case 'changelog': return buildChangeRecord(lines);
    case 'requirements': return buildRequirementsBrief(lines);
    default:return input;
  }
}

function parseRows(input:string){const lines=input.trim().split(/\r?\n/);const delimiter=lines[0]?.includes('\t')?'\t':',';return lines.map(line=>line.split(delimiter).map(v=>v.trim()))}
function inspectTable(input:string){const rows=parseRows(input);const width=Math.max(...rows.map(r=>r.length));return `Rows: ${Math.max(0,rows.length-1)}\nColumns: ${width}\nHeaders: ${(rows[0]||[]).join(', ')}\n\n${toMarkdownTable(rows.slice(1,8),rows[0])}${rows.length>8?'\n…preview limited to 7 rows':''}`}
function numericSummary(input:string){const nums=(input.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number).sort((a,b)=>a-b);if(!nums.length)throw new Error('Enter at least one number.');const sum=nums.reduce((a,b)=>a+b,0),mean=sum/nums.length,median=nums.length%2?nums[(nums.length-1)/2]:(nums[nums.length/2-1]+nums[nums.length/2])/2;const variance=nums.reduce((a,n)=>a+(n-mean)**2,0)/nums.length;return `Count: ${nums.length}\nSum: ${sum}\nMean: ${mean.toFixed(4)}\nMedian: ${median}\nMinimum: ${nums[0]}\nMaximum: ${nums.at(-1)}\nPopulation SD: ${Math.sqrt(variance).toFixed(4)}`}
function convertUnit(input:string){const [raw,from,to]=input.split('|').map(s=>s.trim().toLowerCase());const n=Number(raw);if(!Number.isFinite(n))throw new Error('Use: value | from | to');const length:Record<string,number>={m:1,km:1000,cm:.01,mm:.001,mi:1609.344,ft:.3048,in:.0254};if(from==='c'&&to==='f')return `${n} °C = ${(n*9/5+32).toFixed(4)} °F`;if(from==='f'&&to==='c')return `${n} °F = ${((n-32)*5/9).toFixed(4)} °C`;if(!(from in length)||!(to in length))throw new Error('Supported: m, km, cm, mm, mi, ft, in, and c/f temperature.');return `${n} ${from} = ${(n*length[from]/length[to]).toFixed(6)} ${to}`}
function compareDrafts(input:string){const [a='',b='']=input.split(/^---$/m).map(s=>s.trim());const left=a.split(/\r?\n/),right=b.split(/\r?\n/),max=Math.max(left.length,right.length);return Array.from({length:max},(_,i)=>left[i]===right[i]?`  ${left[i]||''}`:`- ${left[i]||''}\n+ ${right[i]||''}`).join('\n')}
function chooseMethod(input:string){const s=input.toLowerCase();if(s.includes('two')&&s.includes('independent')&&(s.includes('average')||s.includes('continuous')))return 'Starting point: independent-samples t-test.\nCheck independence, approximate normality within groups, influential outliers, and variance assumptions. Report effect size and confidence interval.';if(s.includes('paired')||s.includes('before')&&s.includes('after'))return 'Starting point: paired-samples t-test.\nCheck the distribution of within-pair differences and report effect size with a confidence interval.';if(s.includes('categor'))return 'Starting point: chi-square test of association.\nCheck expected cell counts; consider Fisher’s exact test for sparse tables.';if(s.includes('correl'))return 'Starting point: Pearson correlation for linear continuous relationships, or Spearman correlation for monotonic/ordinal data.\nInspect a scatterplot first.';return 'Describe the outcome type, predictor/group type, number of groups, whether observations are paired, and the comparison or association you want to test.'}
function barFigure(input:string){const rows=input.trim().split(/\r?\n/).map(l=>{const [label,value]=l.split('|');return {label:label?.trim(),value:Number(value)}}).filter(r=>r.label&&Number.isFinite(r.value));const max=Math.max(...rows.map(r=>r.value),1);return rows.map(r=>`${r.label.padEnd(18)} ${'█'.repeat(Math.max(1,Math.round(r.value/max*28)))} ${r.value}`).join('\n')}
function writingReview(input:string){const words=input.trim().split(/\s+/).filter(Boolean),sentences=input.split(/[.!?]+/).filter(s=>s.trim()),long=sentences.filter(s=>s.trim().split(/\s+/).length>25).length,passive=(input.match(/\b(is|are|was|were|be|been|being)\s+\w+(ed|en)\b/gi)||[]).length;return `Words: ${words.length}\nSentences: ${sentences.length}\nAverage words per sentence: ${(words.length/Math.max(sentences.length,1)).toFixed(1)}\nSentences over 25 words: ${long}\nPossible passive constructions: ${passive}\nEstimated reading time: ${Math.max(1,Math.ceil(words.length/220))} min`}
function summarizeStatuses(lines:string[]){const groups=new Map<string,string[]>();lines.forEach(line=>{const [status='Unspecified',...rest]=line.split('|').map(s=>s.trim());groups.set(status,[...(groups.get(status)||[]),rest.join(' | ')])});return [...groups].map(([status,items])=>`${status} (${items.length})\n${items.map(i=>`• ${i}`).join('\n')}`).join('\n\n')}
function surveySummary(input:string){const rows=parseRows(input),headers=rows.shift()||[];return headers.map((header,index)=>{const counts=new Map<string,number>();rows.forEach(row=>{const value=row[index]||'(missing)';counts.set(value,(counts.get(value)||0)+1)});return `${header}\n${[...counts].sort((a,b)=>b[1]-a[1]).map(([v,c])=>`• ${v}: ${c} (${(c/Math.max(rows.length,1)*100).toFixed(1)}%)`).join('\n')}`}).join('\n\n')}
function toMarkdownTable(rows:string[][],headers:string[]=[]){const width=Math.max(headers.length,...rows.map(r=>r.length));const head=Array.from({length:width},(_,i)=>headers[i]||`Column ${i+1}`);return `| ${head.join(' | ')} |\n| ${head.map(()=> '---').join(' | ')} |\n${rows.map(r=>`| ${Array.from({length:width},(_,i)=>r[i]||'').join(' | ')} |`).join('\n')}`}
function buildOutline(lines:string[]){return `# Document outline\n\n${lines.map((line,index)=>{const [section,purpose='']=line.split('|').map(s=>s.trim());return `## ${index+1}. ${section}\n${purpose}`}).join('\n\n')}`}
function buildReadme(input:string){const [project='Untitled project',purpose='Add a project purpose.',setup='Add setup instructions.']=input.split('|').map(s=>s.trim());return `# ${project}\n\n${purpose}\n\n## Requirements\n\n- Node.js 20 or later\n- npm\n\n## Setup\n\n\`\`\`powershell\n${setup}\n\`\`\`\n\n## Usage\n\nDocument the primary workflow and expected output.\n\n## Data and privacy\n\nState what information is processed, stored, or transmitted.\n\n## License\n\nAdd the approved project license.`}
function buildProcedure(lines:string[]){return `# Standard operating procedure\n\n## Purpose\n\nDocument the approved sequence for a repeatable task.\n\n## Procedure\n\n${lines.map((line,index)=>`${index+1}. ${line.trim()}`).join('\n')}\n\n## Completion check\n\n- [ ] Output reviewed\n- [ ] Exceptions recorded\n- [ ] Files stored in the approved location`}
function buildMeetingRecord(lines:string[]){const date=new Intl.DateTimeFormat('en-CA').format(new Date());return `# Meeting record — ${date}\n\n${toMarkdownTable(lines.map(line=>line.split('|').map(s=>s.trim())),['Topic','Decision','Owner','Due date'])}\n\n## Follow-up\n\nReview open items at the next meeting.`}
function buildChangeRecord(lines:string[]){const groups=new Map<string,string[]>();lines.forEach(line=>{const [type='Changed',...rest]=line.split('|').map(s=>s.trim());groups.set(type,[...(groups.get(type)||[]),rest.join(' | ')])});return `# Change record\n\n${[...groups].map(([type,items])=>`## ${type}\n${items.map(item=>`- ${item}`).join('\n')}`).join('\n\n')}`}
function buildRequirementsBrief(lines:string[]){return `# Requirements brief\n\n${lines.map((line,index)=>{const [need='Requirement',reason='Not specified',acceptance='Not specified']=line.split('|').map(s=>s.trim());return `## R${String(index+1).padStart(2,'0')} — ${need}\n\n- **Rationale:** ${reason}\n- **Acceptance:** ${acceptance}`}).join('\n\n')}`}
function downloadText(text:string,name:string){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),0)}

function TimerWorkspace({tool,onBack,onActivity}:{tool:Tool;onBack:()=>void;onActivity:(a:string,b:string)=>void}){
  const [minutes,setMinutes]=useState(25),[remaining,setRemaining]=useState(25*60),[running,setRunning]=useState(false);
  useEffect(()=>{if(!running)return;const id=setInterval(()=>setRemaining(r=>{if(r<=1){clearInterval(id);setRunning(false);onActivity('Focus interval complete',`${minutes} minutes`);return 0}return r-1}),1000);return()=>clearInterval(id)},[running,minutes,onActivity]);
  const reset=()=>{setRunning(false);setRemaining(minutes*60)};
  return <div className="student-workspace timer-workspace"><button className="back-button" onClick={onBack}><ArrowLeft size={16}/> All Bachelor tools</button><p className="eyebrow">Bachelor / Local workspace</p><h2>{tool.name}</h2><p>{tool.description}</p><div className="timer-face">{String(Math.floor(remaining/60)).padStart(2,'0')}:{String(remaining%60).padStart(2,'0')}</div><label className="timer-setting">Minutes<input type="number" min="1" max="180" value={minutes} onChange={e=>{const n=Math.max(1,Number(e.target.value)||1);setMinutes(n);setRemaining(n*60);setRunning(false)}}/></label><div className="workspace-actions"><button className="run-button" onClick={()=>setRunning(!running)}>{running?'Pause':'Start focus'}</button><button onClick={reset}>Reset</button></div></div>
}

function FileWorkspace({tool,onBack,onActivity}:{tool:Tool;onBack:()=>void;onActivity:(a:string,b:string)=>void}){
  const [file,setFile]=useState<File|null>(null),[result,setResult]=useState(''),[busy,setBusy]=useState(false),[progress,setProgress]=useState('');const inputRef=useRef<HTMLInputElement>(null);
  const run=async()=>{if(!file)return;setBusy(true);setResult('');try{if(tool.processor==='pdf'){const doc=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise;const output:string[]=[];for(let i=1;i<=doc.numPages;i++){setProgress(`Reading page ${i} of ${doc.numPages}…`);const page=await doc.getPage(i);const annotations=await page.getAnnotations();annotations.forEach((a:any)=>output.push(`Page ${i} · ${a.subtype||'Annotation'}\n${a.contentsObj?.str||a.titleObj?.str||a.url||'No text content'}`));}setResult(output.join('\n\n')||'No extractable PDF annotations were found.');}else{setProgress('Loading local OCR engine…');const {recognize}=await import('tesseract.js');const response=await recognize(file,'eng',{logger:m=>{if(m.progress)setProgress(`${m.status} · ${Math.round(m.progress*100)}%`)}});setResult(response.data.text||'No text was recognized.');}onActivity(`${tool.name} completed`,file.name)}catch(e){setResult(e instanceof Error?e.message:'Processing failed.')}finally{setBusy(false);setProgress('')}};
  return <div className="student-workspace"><button className="back-button" onClick={onBack}><ArrowLeft size={16}/> All PhD tools</button><p className="eyebrow">PhD / Local file workspace</p><h2>{tool.name}</h2><p>{tool.description}</p><div className="file-tool-grid"><button className="file-pick" onClick={()=>inputRef.current?.click()}><Upload size={28}/><strong>{file?file.name:'Choose a local file'}</strong><span>{tool.processor==='pdf'?'PDF documents':'PNG, JPG, or WebP images'}</span></button><input ref={inputRef} hidden type="file" accept={tool.processor==='pdf'?'.pdf,application/pdf':'image/*'} onChange={e=>setFile(e.target.files?.[0]||null)}/><div className="student-output-pane"><div className="output-head"><span>Extracted output</span>{result&&<button onClick={()=>downloadText(result,`${tool.id}.txt`)}><Download size={15}/> Export</button>}</div>{result?<pre className="text-output">{result}</pre>:<div className="output-empty"><FileSearch size={28}/><strong>{progress||'Ready for a file'}</strong></div>}</div></div><button className="run-button file-run" onClick={run} disabled={!file||busy}>{busy?(progress||'Processing…'):tool.action}</button></div>
}
