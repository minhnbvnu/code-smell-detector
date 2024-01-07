function getAppName(version) {
  const match = version.match(/\d+\.\d+\.\d+(-([a-z]+)(\d+|-\w{4,})?)?$/);
  if (!match) {
    throw new Error(`Found incorrectly formatted Atom version ${version}`);
  } else if (match[2]) {
    return `atom-${match[2]}`;
  }

  return 'atom';
}