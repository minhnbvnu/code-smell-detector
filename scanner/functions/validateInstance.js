function validateInstance(hierarchy, instanceIndex, stack2) {
    const parentCounts = hierarchy.parentCounts;
    const parentIds = hierarchy.parentIds;
    const parentIndexes = hierarchy.parentIndexes;
    const classIds = hierarchy.classIds;
    const instancesLength = classIds.length;
    if (!defined(parentIds)) {
      return;
    }
    assert(instanceIndex < instancesLength, `Parent index ${instanceIndex} exceeds the total number of instances: ${instancesLength}`);
    assert(stack2.indexOf(instanceIndex) === -1, "Circular dependency detected in the batch table hierarchy.");
    stack2.push(instanceIndex);
    const parentCount = defined(parentCounts) ? parentCounts[instanceIndex] : 1;
    const parentIndex = defined(parentCounts) ? parentIndexes[instanceIndex] : instanceIndex;
    for (let i2 = 0; i2 < parentCount; ++i2) {
      const parentId = parentIds[parentIndex + i2];
      if (parentId !== instanceIndex) {
        validateInstance(hierarchy, parentId, stack2);
      }
    }
    stack2.pop(instanceIndex);
  }