async function killInternalProcess() {
  lastKill = Date.now();
  ipcRenderer.send("clean-processes");
  return delay(1000);
}