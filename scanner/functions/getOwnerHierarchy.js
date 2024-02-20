function getOwnerHierarchy(instance) {
  var hierarchy = [];
  traverseOwnerTreeUp(hierarchy, instance);
  return hierarchy;
}