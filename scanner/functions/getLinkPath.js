function getLinkPath(repo, path, hash = '') {
  const filepath = `${repo}-${path}`;
  if (hash[0] === '#') {
    hash = hash.slice(1);
  }
  const route = markdownFiles[filepath];
  if (!route) {
    console.warn('Cannot find linked doc: ', filepath); // eslint-disable-line
  }
  return `#/${route}${hash ? '?section=' : ''}${hash}`;
}