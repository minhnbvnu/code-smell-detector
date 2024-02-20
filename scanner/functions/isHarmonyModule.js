function isHarmonyModule(module) {
  const buildMeta = module.buildMeta;
  if (!buildMeta) return false;
  return !!buildMeta.harmonyModule || buildMeta.exportsType === 'namespace';
}