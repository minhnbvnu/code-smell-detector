function traverseHierarchyMultipleParents(hierarchy, instanceIndex, endConditionCallback) {
    const classIds = hierarchy.classIds;
    const parentCounts = hierarchy.parentCounts;
    const parentIds = hierarchy.parentIds;
    const parentIndexes = hierarchy.parentIndexes;
    const instancesLength = classIds.length;
    const visited = scratchVisited;
    visited.length = Math.max(visited.length, instancesLength);
    const visitedMarker = ++marker;
    const stack2 = scratchStack;
    stack2.length = 0;
    stack2.push(instanceIndex);
    while (stack2.length > 0) {
      instanceIndex = stack2.pop();
      if (visited[instanceIndex] === visitedMarker) {
        continue;
      }
      visited[instanceIndex] = visitedMarker;
      const result = endConditionCallback(hierarchy, instanceIndex);
      if (defined(result)) {
        return result;
      }
      const parentCount = parentCounts[instanceIndex];
      const parentIndex = parentIndexes[instanceIndex];
      for (let i2 = 0; i2 < parentCount; ++i2) {
        const parentId = parentIds[parentIndex + i2];
        if (parentId !== instanceIndex) {
          stack2.push(parentId);
        }
      }
    }
    return null;
  }