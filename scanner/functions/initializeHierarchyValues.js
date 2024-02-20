function initializeHierarchyValues(hierarchyJson, binaryBody) {
    let i2;
    let classId;
    let binaryAccessor;
    const instancesLength = hierarchyJson.instancesLength;
    const classes = hierarchyJson.classes;
    let classIds = hierarchyJson.classIds;
    let parentCounts = hierarchyJson.parentCounts;
    let parentIds = hierarchyJson.parentIds;
    let parentIdsLength = instancesLength;
    if (defined(classIds.byteOffset)) {
      classIds.componentType = defaultValue(classIds.componentType, GL.UNSIGNED_SHORT);
      classIds.type = AttributeType.SCALAR;
      binaryAccessor = getBinaryAccessor(classIds);
      classIds = binaryAccessor.createArrayBufferView(binaryBody.buffer, binaryBody.byteOffset + classIds.byteOffset, instancesLength);
    }
    let parentIndexes;
    if (defined(parentCounts)) {
      if (defined(parentCounts.byteOffset)) {
        parentCounts.componentType = defaultValue(parentCounts.componentType, GL.UNSIGNED_SHORT);
        parentCounts.type = AttributeType.SCALAR;
        binaryAccessor = getBinaryAccessor(parentCounts);
        parentCounts = binaryAccessor.createArrayBufferView(binaryBody.buffer, binaryBody.byteOffset + parentCounts.byteOffset, instancesLength);
      }
      parentIndexes = new Uint16Array(instancesLength);
      parentIdsLength = 0;
      for (i2 = 0; i2 < instancesLength; ++i2) {
        parentIndexes[i2] = parentIdsLength;
        parentIdsLength += parentCounts[i2];
      }
    }
    if (defined(parentIds) && defined(parentIds.byteOffset)) {
      parentIds.componentType = defaultValue(parentIds.componentType, GL.UNSIGNED_SHORT);
      parentIds.type = AttributeType.SCALAR;
      binaryAccessor = getBinaryAccessor(parentIds);
      parentIds = binaryAccessor.createArrayBufferView(binaryBody.buffer, binaryBody.byteOffset + parentIds.byteOffset, parentIdsLength);
    }
    const classesLength = classes.length;
    for (i2 = 0; i2 < classesLength; ++i2) {
      const classInstancesLength = classes[i2].length;
      const properties = classes[i2].instances;
      const binaryProperties = getBinaryProperties(classInstancesLength, properties, binaryBody);
      classes[i2].instances = combine(binaryProperties, properties);
    }
    const classCounts = new Array(classesLength).fill(0);
    const classIndexes = new Uint16Array(instancesLength);
    for (i2 = 0; i2 < instancesLength; ++i2) {
      classId = classIds[i2];
      classIndexes[i2] = classCounts[classId];
      ++classCounts[classId];
    }
    const hierarchy = {
      classes,
      classIds,
      classIndexes,
      parentCounts,
      parentIndexes,
      parentIds
    };
    validateHierarchy(hierarchy);
    return hierarchy;
  }