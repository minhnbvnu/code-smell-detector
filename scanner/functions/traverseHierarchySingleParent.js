function traverseHierarchySingleParent(hierarchy, instanceIndex, endConditionCallback) {
    let hasParent = true;
    while (hasParent) {
      const result = endConditionCallback(hierarchy, instanceIndex);
      if (defined(result)) {
        return result;
      }
      const parentId = hierarchy.parentIds[instanceIndex];
      hasParent = parentId !== instanceIndex;
      instanceIndex = parentId;
    }
    throw new Error("traverseHierarchySingleParent");
  }