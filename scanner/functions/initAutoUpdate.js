function initAutoUpdate() {
  if (isDev || AUTO_UPDATE_ENABLED !== true) return;
  autoUpdater.checkForUpdates();
  const oneHour = 60 * 60 * 1000;
  setInterval(() => autoUpdater.checkForUpdates(), oneHour);
}