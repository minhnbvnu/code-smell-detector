async function openUserDataFolderAndQuit() {
  shell.showItemInFolder(resolveUserDataDirectory());
  remote.app.quit();
}