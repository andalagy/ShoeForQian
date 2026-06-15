import { useExperienceStore } from "../../store/experienceStore";
export function DiscoveryLight() { const progress = useExperienceStore((s) => s.discoveryProgress); return <div className="discoveryProgress" aria-label={`Discovery ${Math.round(progress)} percent`}><span style={{ transform: `rotate(${progress * 3.6}deg)` }} /></div>; }
