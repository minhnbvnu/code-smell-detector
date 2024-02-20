function deletePathInObject(object, path) {
  const length = path.length;
  const last = path[length - 1];

  if (object != null) {
    const parent = getInObject(object, path.slice(0, length - 1));

    if (parent) {
      if (Object(isArray["a" /* default */])(parent)) {
        parent.splice(last, 1);
      } else {
        delete parent[last];
      }
    }
  }
}