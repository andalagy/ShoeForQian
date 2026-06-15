"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useExperienceStore, type ExperienceStage } from "../../store/experienceStore";
import { IntroSequence } from "./IntroSequence";
import { DiscoveryLight } from "./DiscoveryLight";
import { BootScene } from "./BootScene";
import { ExaminationDial } from "./ExaminationDial";
import { DetailHotspots } from "./DetailHotspots";
import { DetailNarrative } from "./DetailNarrative";
import { ClaimChamber } from "./ClaimChamber";
import { CartConfirmation } from "./CartConfirmation";
import { InformationSheet } from "./InformationSheet";
import { SoundController } from "./SoundController";

const stages: ExperienceStage[] = ["reveal", "examination", "claim"];

export function BootExperience() {
  const { stage, setStage, setReducedMotion, discoveryProgress, setDiscoveryProgress, reducedMotion } = useExperienceStore();
  const root = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 45, down: false, moved: false });
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [setReducedMotion]);

  useEffect(() => {
    if (!root.current || reducedMotion) return;
    gsap.fromTo(root.current, { opacity: 0.72 }, { opacity: 1, duration: 1.25, ease: "power3.out" });
  }, [stage, reducedMotion]);

  useEffect(() => {
    if ((stage === "intro" || stage === "discovery") && discoveryProgress >= 70) {
      setStage("reveal");
    }
  }, [discoveryProgress, stage, setStage]);

  const registerActivity = () => {
    setIdle(false);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), 8000);
  };

  const moveToStage = (direction: number) => {
    const current = stages.includes(stage) ? stages.indexOf(stage) : 0;
    const next = Math.min(stages.length - 1, Math.max(0, current + direction));
    setStage(stages[next]);
  };

  return (
    <main
      ref={root}
      className={`objectExperience stage-${stage} ${idle ? "isIdle" : ""}`}
      style={{ "--px": `${pointer.x}%`, "--py": `${pointer.y}%`, "--press": pointer.down ? 1 : 0 } as React.CSSProperties}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPointer({ x, y, down: pointer.down, moved: true });
        registerActivity();
        if (stage === "intro") setStage("discovery");
        if (stage === "discovery") setDiscoveryProgress(discoveryProgress + (pointer.down ? 2.8 : 1.35));
      }}
      onPointerDown={() => { setPointer((p) => ({ ...p, down: true })); registerActivity(); }}
      onPointerUp={() => setPointer((p) => ({ ...p, down: false }))}
      onWheel={(event) => { event.preventDefault(); registerActivity(); moveToStage(event.deltaY > 0 ? 1 : -1); }}
      onKeyDown={(event) => {
        if (["ArrowRight", "ArrowDown"].includes(event.key)) moveToStage(1);
        if (["ArrowLeft", "ArrowUp"].includes(event.key)) moveToStage(-1);
      }}
      tabIndex={0}
      aria-label="Interactive exhibition for The First Form boot"
    >
      <BootScene pointer={pointer} />
      <DiscoveryLight />
      <IntroSequence hidden={pointer.moved || stage !== "intro"} />
      {stage === "examination" && <DetailHotspots />}
      <DetailNarrative />
      {stage === "claim" && <ClaimChamber />}
      {stage === "cart-confirmation" && <CartConfirmation />}
      {stage !== "cart-confirmation" && <ExaminationDial onStep={moveToStage} />}
      <InformationSheet />
      <SoundController />
      <div className="idleHint" aria-hidden={!idle}>Move to reveal</div>
    </main>
  );
}
