function parseXFAPath(path) {
  const positionPattern = /(.+)\[([0-9]+)\]$/;
  return path.split(".").map(component => {
    const m = component.match(positionPattern);

    if (m) {
      return {
        name: m[1],
        pos: parseInt(m[2], 10)
      };
    }

    return {
      name: component,
      pos: 0
    };
  });
}