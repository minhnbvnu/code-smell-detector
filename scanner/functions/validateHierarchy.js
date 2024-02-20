function validateHierarchy(hierarchy) {
    const scratchValidateStack = [];
    const classIds = hierarchy.classIds;
    const instancesLength = classIds.length;
    for (let i2 = 0; i2 < instancesLength; ++i2) {
      validateInstance(hierarchy, i2, stack);
    }
  }