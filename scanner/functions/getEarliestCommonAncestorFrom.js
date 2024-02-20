function getEarliestCommonAncestorFrom(paths) {
  return this.getDeepestCommonAncestorFrom(paths, function (deepest, i, ancestries) {
    let earliest;
    const keys = t.VISITOR_KEYS[deepest.type];

    for (const ancestry of ancestries) {
      const path = ancestry[i + 1];

      if (!earliest) {
        earliest = path;
        continue;
      }

      if (path.listKey && earliest.listKey === path.listKey) {
        if (path.key < earliest.key) {
          earliest = path;
          continue;
        }
      }

      const earliestKeyIndex = keys.indexOf(earliest.parentKey);
      const currentKeyIndex = keys.indexOf(path.parentKey);

      if (earliestKeyIndex > currentKeyIndex) {
        earliest = path;
      }
    }

    return earliest;
  });
}