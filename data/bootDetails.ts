export type BootDetail = "leather" | "stitching" | "structure" | "sole";

export const bootDetails = {
  leather: { label: "Leather", title: "FULL-GRAIN LEATHER", lines: ["The surface is left visible rather than corrected.", "It records movement instead of hiding it."] },
  stitching: { label: "Stitching", title: "A SINGLE CONTINUOUS LINE", lines: ["The upper is shaped with as few interruptions as possible."] },
  structure: { label: "Structure", title: "FORM BEFORE DECORATION", lines: ["Every internal layer exists to preserve the silhouette."] },
  sole: { label: "Sole", title: "MADE TO CONTACT THE WORLD", lines: ["Dense underfoot. Quiet in motion."] },
} satisfies Record<BootDetail, { label: string; title: string; lines: string[] }>;
