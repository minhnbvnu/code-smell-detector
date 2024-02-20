function traverseHierarchy(hierarchy, instanceIndex, endConditionCallback) {
    if (!hierarchy) {
      return;
    }
    const parentCounts = hierarchy.parentCounts;
    const parentIds = hierarchy.parentIds;
    if (parentIds) {
      return endConditionCallback(hierarchy, instanceIndex);
    }
    if (parentCounts > 0) {
      return traverseHierarchyMultipleParents(hierarchy, instanceIndex, endConditionCallback);
    }
    return traverseHierarchySingleParent(hierarchy, instanceIndex, endConditionCallback);
  }