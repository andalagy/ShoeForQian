import { bootDetails, type BootDetail } from "../../data/bootDetails";
import { useExperienceStore } from "../../store/experienceStore";
const positions: Record<BootDetail, string> = { leather: "p1", stitching: "p2", structure: "p3", sole: "p4" };
export function DetailHotspots() { const set = useExperienceStore((s)=>s.setActiveDetail); return <div className="hotspots">{(Object.keys(bootDetails) as BootDetail[]).map((d)=><button key={d} className={`hotspot ${positions[d]}`} onClick={()=>set(d)} aria-label={`Examine ${bootDetails[d].label}`}><span />{bootDetails[d].label}</button>)}</div>; }
