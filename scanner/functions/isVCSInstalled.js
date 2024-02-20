function isVCSInstalled(repoType) {
  return commandExists.sync(repoType);
}