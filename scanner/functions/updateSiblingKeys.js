function updateSiblingKeys(fromIndex, incrementBy) {
  if (!this.parent) return;

  const paths = _cache.path.get(this.parent);

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    if (path.key >= fromIndex) {
      path.key += incrementBy;
    }
  }
}