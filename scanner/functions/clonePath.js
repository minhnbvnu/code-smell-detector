function clonePath(path) {
    return { newPos: path.newPos, components: path.components.slice(0) };
  }