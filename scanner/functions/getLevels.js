function getLevels (level) {
  if (!level) return LEVEL_KEYS

  const index = LEVEL_KEYS.findIndex(val => val === level)
  return LEVEL_KEYS.filter((val, idx) => idx > index)
}