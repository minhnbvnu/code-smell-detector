function __parseModule(__path, moduleMeta, type) {
  const root = moduleMeta.root;
  // front
  if (type !== 'backend') {
    for (const item of __path.fronts) {
      const file = path.join(root, item.js);
      if (fse.existsSync(file)) {
        moduleMeta.js.front = file;
        break;
      }
    }
    if (!moduleMeta.js.front) {
      return null;
    }
  }
  // backend
  if (type !== 'front') {
    for (const item of __path.backends) {
      const file = path.join(root, item.js);
      if (fse.existsSync(file)) {
        moduleMeta.js.backend = file;
        const staticBackendPath = path.normalize(path.join(root, item.static));
        moduleMeta.static.backend = staticBackendPath;
        break;
      }
    }
    if (!moduleMeta.js.backend) {
      return null;
    }
  }
  // ok
  return moduleMeta;
}