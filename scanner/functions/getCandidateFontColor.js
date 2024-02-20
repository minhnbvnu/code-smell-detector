function getCandidateFontColor() {
  const isOverrideColors = getSettings("isOverrideColors");

  if (!isOverrideColors) return undefined;

  return { color: getSettings("candidateFontColor") };
}