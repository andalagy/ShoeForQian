import { useExperienceStore } from "../../store/experienceStore";
export function ExaminationDial({ onStep }: { onStep: (direction: number) => void }) {
  const stage = useExperienceStore((s) => s.stage); const setStage = useExperienceStore((s) => s.setStage);
  const index = stage === "examination" ? 1 : stage === "claim" ? 2 : 0;
  return <div className="dial" role="radiogroup" aria-label="Examination Dial">
    {["reveal","examination","claim"].map((s, i) => <button key={s} className={i===index?"active":""} role="radio" aria-checked={i===index} aria-label={s} onClick={() => setStage(s as never)} />)}
    <button className="dialPlate" aria-label="Move dial" onClick={() => onStep(1)}>Examination Dial</button>
  </div>;
}
