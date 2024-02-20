function selectFolder() {
  ipcRenderer.send('context-appwindow', 'open-dialog');
  return {
    type: SELECT_FOLDER
  };
}