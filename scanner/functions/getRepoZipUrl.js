function getRepoZipUrl(repoUrl) {
  if (repoUrl.includes('github')) {
    const parts = repoUrl.split('/');
    const repo = parts.pop().replace('.git', '');
    const group = parts.pop();
    return `https://codeload.github.com/${group}/${repo}/zip/master`;
  }
  throw new Error('Only support repo zip file from github.');
}