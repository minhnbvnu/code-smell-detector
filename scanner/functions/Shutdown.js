function Shutdown() {
  Services.obs.removeObserver(
    signonReloadDisplay,
    "passwordmgr-storage-changed"
  );
}