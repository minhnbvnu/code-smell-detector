function sortGroups(groups) {
  const originalOrder = groups.map((item, i) => i);
  const edges = new Map();

  for (let i = 0; i < groups.length; i++) {
    findEdgesInGroup(groups, i, edges);
  }

  const sortedGroupIndexes = sortTopologically(originalOrder, edges);
  return sortedGroupIndexes.map(i => groups[i]);
}