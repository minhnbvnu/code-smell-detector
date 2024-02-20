function getUnfilteredRoots(first, last, closest) {
  if (first.node === last.node) return [first.node];

  const roots = [];

  const [start, end] = getEdges(first, last, closest);

  if (start === null || end === null) return [];

  for (let i = start; i <= end; i++) roots.push(closest.item(i));

  return roots;
}