function deepFind(obj, givenPath) {
  const paths = typeof givenPath === 'string' ? givenPath.split('.') : givenPath;
  let current = obj;

  for (let i = 0; i < paths.length; ++i) {
    if (typeof current[paths[i]] === 'undefined') {
      return undefined;
    }

    current = current[paths[i]];
  }

  return current;
}