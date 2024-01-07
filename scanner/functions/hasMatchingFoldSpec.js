function hasMatchingFoldSpec(specs, node) {
  return specs.some(
    ({ type, named }) => type === node.type && named === node.isNamed
  );
}