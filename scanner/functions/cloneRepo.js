function cloneRepo(repoType, repoUrl, outputDir, repoDir, checkout) {
  console.log('start cloning...');
  spawnSync(repoType, cloneArguments(repoType, repoUrl, outputDir), { cmd: repoDir, stdio: 'inherit' });
  console.log('finish clone.');

  if (checkout) {
    debug('checkout is %s', checkout);
    spawnSync(repoType, ['checkout', checkout], { cmd: repoDir, stdio: 'inherit' });
  }
}