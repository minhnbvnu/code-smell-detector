function getPredecessorsVertical(relativeConstraints, childName) {
  let predecessors = [];

  const c = relativeConstraints[childName] || {};
  if (c.above) predecessors.push(c.above);

  if (c.below) predecessors.push(c.below);

  if (c.alignTop) predecessors.push(c.alignTop);

  if (c.alignBottom) predecessors.push(c.alignBottom);

  return predecessors;
}