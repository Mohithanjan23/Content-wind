// Format number like 5230 -> "5.2k"
export function formatViews(num) {
  if (!num && num !== 0) return "";
  if (num < 1000) return num.toString();
  return (num / 1000).toFixed(1) + "k";
}

export function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}
