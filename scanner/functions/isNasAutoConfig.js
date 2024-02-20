function isNasAutoConfig(nasConfig) {
  if (nasConfig === 'Auto') { return true; }

  if ((nasConfig || {}).Auto) {
    ensureNasParams(nasConfig);
    return true;
  }
  return false;
}