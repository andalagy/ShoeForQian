import { bootDetails } from "../../data/bootDetails";
import { useExperienceStore } from "../../store/experienceStore";
export function DetailNarrative(){ const {activeDetail,setActiveDetail}=useExperienceStore(); if(!activeDetail) return null; const d=bootDetails[activeDetail]; return <aside className="detailNarrative"><button onClick={()=>setActiveDetail(null)} aria-label="Return to complete boot">×</button><h2>{d.title}</h2>{d.lines.map(l=><p key={l}>{l}</p>)}</aside>; }
