function waitUntilLibraryInstalled(client) {
  return waitForExist(client, '.SnackBarMessage*=Installed', 10000);
}