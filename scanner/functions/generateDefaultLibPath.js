function generateDefaultLibPath(prefix) {
  return sysLibs.map(p => `${prefix}${p}`).join(':');
}