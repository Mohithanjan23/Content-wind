// Validate if pitch text is acceptable
export function validatePitch(pitch) {
  if (!pitch || pitch.trim().length === 0) {
    return { valid: false, message: "Pitch cannot be empty." };
  }

  if (pitch.length < 10) {
    return { valid: false, message: "Pitch is too short. Add more detail." };
  }

  return { valid: true };
}

// Validate platform selection
export function validatePlatforms(platforms) {
  const selected = Object.values(platforms).filter(Boolean).length;
  if (selected === 0) {
    return { valid: false, message: "Select at least one platform." };
  }
  return { valid: true };
}
