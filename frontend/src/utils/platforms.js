// Centralized platform definitions
export const PLATFORMS = {
  instagram: {
    label: "Instagram",
    type: "short-form",
    prefers: ["visual", "humor", "quick-hooks"],
  },

  linkedin: {
    label: "LinkedIn",
    type: "professional",
    prefers: ["educational", "formal-tone"],
  },
};

// Helper to list enabled platforms
export function getSelectedPlatforms(platforms) {
  return Object.entries(platforms)
    .filter(([_, enabled]) => enabled)
    .map(([name]) => name);
}
