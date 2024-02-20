function identifyRepo(repoUrl) {
  debug('identify repo...');
  const repoUrlValues = repoUrl.split('+');

  if (repoUrlValues.length === 2) {
    const [repoType, realRepoUrl] = repoUrlValues;
    if (['git', 'hg'].includes(repoType)) {
      return { repoType, repoUrl: realRepoUrl };
    }
  } else {
    if (repoUrl.indexOf('git') !== -1) {
      return { repoType: 'git', repoUrl: repoUrl };
    } else if (repoUrl.indexOf('bitbucket') !== -1) {
      return { repoType: 'hg', repoUrl: repoUrl };
    }
  }

  throw new Error('Unknown Repo Type.');
}