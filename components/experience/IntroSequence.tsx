export function IntroSequence({ hidden }: { hidden: boolean }) {
  return <div className={`introSequence ${hidden ? "hidden" : ""}`}><div className="brandSymbol">◆</div><h1>AN OBJECT FOR THE GROUND</h1><p>Move to reveal</p></div>;
}
