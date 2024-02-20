function cloneArguments(repoType, repoUrl, outputDir) {
  switch (repoType) {
  case 'git':
    return ['clone', '--depth=1', repoUrl, outputDir];
  default:
    return ['clone', repoUrl, outputDir];
  }
}