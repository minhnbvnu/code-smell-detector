function renamePathInObject(object, oldPath, newPath) {
  const length = oldPath.length;

  if (object != null) {
    const parent = getInObject(object, oldPath.slice(0, length - 1));

    if (parent) {
      const lastOld = oldPath[length - 1];
      const lastNew = newPath[length - 1];
      parent[lastNew] = parent[lastOld];

      if (Object(isArray["a" /* default */])(parent)) {
        parent.splice(lastOld, 1);
      } else {
        delete parent[lastOld];
      }
    }
  }
}