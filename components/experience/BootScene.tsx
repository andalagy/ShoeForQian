import { useExperienceStore } from "../../store/experienceStore";

export function BootScene({ pointer }: { pointer: { x: number; y: number; down: boolean } }) {
  const { stage, activeDetail } = useExperienceStore();
  const rx = (pointer.y - 50) / 10;
  const ry = (pointer.x - 50) / -3.2;
  return <section className={`bootScene detail-${activeDetail ?? "none"}`} aria-label="Layered fallback rendering of a full-grain leather boot">
    <div className="environmentGrain" />
    <div className="backTitle" aria-hidden="true">THE FIRST FORM</div>
    <div className="bootRig" style={{ transform: `translate3d(${(pointer.x-50)/60}vw, ${(pointer.y-50)/80}vh, 0) rotateX(${Math.max(-5, Math.min(5, rx))}deg) rotateY(${Math.max(-18, Math.min(18, ry))}deg)` }}>
      <div className="bootGlow" />
      <div className="boot bootShadow" />
      <div className="boot bootBody"><span className="upper"/><span className="toe"/><span className="shaft"/><span className="heel"/><span className="sole"/><span className="stitches"/></div>
      <div className="bootHighlight" />
      {stage === "examination" && activeDetail === "structure" && <div className="layers" aria-hidden="true"><i/> <i/> <i/> <i/> <i/></div>}
    </div>
    {stage === "reveal" && <div className="revealCopy"><p>Full-grain leather.</p><p>Built as a single statement.</p></div>}
  </section>;
}
