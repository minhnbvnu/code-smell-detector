function waitUntilProjectSaved(client) {
  return waitForExist(client, '.SnackBarMessage*=Saved', 5000);
}