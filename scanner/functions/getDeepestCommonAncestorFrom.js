function getDeepestCommonAncestorFrom(paths, filter) {
  if (!paths.length) {
    return this;
  }

  if (paths.length === 1) {
    return paths[0];
  }

  let minDepth = Infinity;
  let lastCommonIndex, lastCommon;
  const ancestries = paths.map(path => {
    const ancestry = [];

    do {
      ancestry.unshift(path);
    } while ((path = path.parentPath) && path !== this);

    if (ancestry.length < minDepth) {
      minDepth = ancestry.length;
    }

    return ancestry;
  });
  const first = ancestries[0];

  depthLoop: for (let i = 0; i < minDepth; i++) {
    const shouldMatch = first[i];

    for (const ancestry of ancestries) {
      if (ancestry[i] !== shouldMatch) {
        break depthLoop;
      }
    }

    lastCommonIndex = i;
    lastCommon = shouldMatch;
  }

  if (lastCommon) {
    if (filter) {
      return filter(lastCommon, lastCommonIndex, ancestries);
    } else {
      return lastCommon;
    }
  } else {
    throw new Error("Couldn't find intersection");
  }
}