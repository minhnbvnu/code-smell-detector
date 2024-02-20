function createModuleIdFactory() {
  const fileToIdMap = Object.create(null);
  let nextId = 0;
  return ({path}) => {
    if (!(path in fileToIdMap)) {
      fileToIdMap[path] = nextId;
      nextId += 1;
    }
    return fileToIdMap[path];
  };
}