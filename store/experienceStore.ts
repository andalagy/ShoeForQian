import { create } from "zustand";
import type { BootDetail } from "../data/bootDetails";

export type ExperienceStage = "intro" | "discovery" | "reveal" | "examination" | "claim" | "cart-confirmation";

interface ExperienceState {
  stage: ExperienceStage;
  discoveryProgress: number;
  activeDetail: BootDetail | null;
  selectedSize: number | null;
  soundEnabled: boolean;
  reducedMotion: boolean;
  cartQuantity: number;
  setStage: (stage: ExperienceStage) => void;
  setDiscoveryProgress: (value: number) => void;
  setActiveDetail: (detail: BootDetail | null) => void;
  setSelectedSize: (size: number | null) => void;
  toggleSound: () => void;
  setReducedMotion: (value: boolean) => void;
  addToCart: () => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  stage: "intro",
  discoveryProgress: 0,
  activeDetail: null,
  selectedSize: null,
  soundEnabled: false,
  reducedMotion: false,
  cartQuantity: 0,
  setStage: (stage) => set((state) => ({ stage, activeDetail: stage === "examination" ? null : state.activeDetail })),
  setDiscoveryProgress: (discoveryProgress) => set({ discoveryProgress: Math.min(100, Math.max(0, discoveryProgress)) }),
  setActiveDetail: (activeDetail) => set({ activeDetail }),
  setSelectedSize: (selectedSize) => set({ selectedSize }),
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  addToCart: () => set((s) => ({ cartQuantity: s.cartQuantity + 1, stage: "cart-confirmation" })),
}));
