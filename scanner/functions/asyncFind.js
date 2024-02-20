async function asyncFind(pathArrays, filter) {
  for (let path of pathArrays) {
    if (await filter(path)) {
      return path;
    }
  }

  return null;
}