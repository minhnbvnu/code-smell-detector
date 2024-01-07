function sortItemsInGroup(group) {
  const originalOrder = group.map((node, i) => i);
  const edges = new Map();
  const commandToIndex = new Map(group.map((item, i) => [item.command, i]));

  group.forEach((item, i) => {
    if (item.before) {
      item.before.forEach(toCommand => {
        const to = commandToIndex.get(toCommand);
        if (to != null) {
          pushOntoMultiMap(edges, to, i);
        }
      });
    }
    if (item.after) {
      item.after.forEach(toCommand => {
        const to = commandToIndex.get(toCommand);
        if (to != null) {
          pushOntoMultiMap(edges, i, to);
        }
      });
    }
  });

  const sortedNodes = sortTopologically(originalOrder, edges);

  return sortedNodes.map(i => group[i]);
}