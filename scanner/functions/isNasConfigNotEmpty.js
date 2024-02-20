function isNasConfigNotEmpty(nasConfig) {
  return !!(nasConfig && nasConfig.mountPoints && nasConfig.mountPoints.length > 0);
}