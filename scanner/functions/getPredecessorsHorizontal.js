function getPredecessorsHorizontal(relativeConstraints, childName) {
  let predecessors = [];

  const c = relativeConstraints[childName] || {};
  if (c.leftOf) predecessors.push(c.leftOf);

  if (c.rightOf) predecessors.push(c.rightOf);

  if (c.alignLeft) predecessors.push(c.alignLeft);

  if (c.alignRight) predecessors.push(c.alignRight);

  return predecessors;
}