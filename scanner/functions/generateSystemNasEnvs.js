function generateSystemNasEnvs(rootEnvPrefix) {
  return {
    'LD_LIBRARY_PATH': `${generateDefaultLibPath(rootEnvPrefix)}`
  };
}