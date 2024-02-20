function traverseOwnerTreeUp(hierarchy, instance) {
  if (instance) {
    hierarchy.unshift(instance);
    traverseOwnerTreeUp(hierarchy, instance._currentElement._owner);
  }
}