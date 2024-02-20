function isSafe(source) {
  if (!/[+*{].*[+*{]/.test(source)) return true; // -35%
  return false;
}