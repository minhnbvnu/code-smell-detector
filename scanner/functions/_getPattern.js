function _getPattern(parts, context) {
  let path = this;

  for (const part of parts) {
    if (part === ".") {
      path = path.parentPath;
    } else {
      if (Array.isArray(path)) {
        path = path[part];
      } else {
        path = path.get(part, context);
      }
    }
  }

  return path;
}