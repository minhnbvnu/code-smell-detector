function findEdgesInGroup(groups, i, edges) {
  const group = groups[i];
  for (const item of group) {
    if (item.beforeGroupContaining) {
      for (const command of item.beforeGroupContaining) {
        const to = indexOfGroupContainingCommand(groups, command, group);
        if (to !== -1) {
          pushOntoMultiMap(edges, to, i);
          return;
        }
      }
    }
    if (item.afterGroupContaining) {
      for (const command of item.afterGroupContaining) {
        const to = indexOfGroupContainingCommand(groups, command, group);
        if (to !== -1) {
          pushOntoMultiMap(edges, i, to);
          return;
        }
      }
    }
  }
}