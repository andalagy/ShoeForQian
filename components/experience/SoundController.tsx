import { useEffect } from "react";
import { useExperienceStore } from "../../store/experienceStore";
export function SoundController(){ const {soundEnabled,stage}=useExperienceStore(); useEffect(()=>{ if(!soundEnabled) return; const audio = new Audio(); audio.volume = 0.08; },[soundEnabled,stage]); return null; }
