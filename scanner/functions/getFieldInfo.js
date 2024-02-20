function getFieldInfo(key) {
    // Create mongoObject if necessary, cache for speed
    if (!mongoObject) mongoObject = new MongoObject(obj, schema.blackboxKeys());

    const keyInfo = mongoObject.getInfoForKey(key) || {};
    return {
      isSet: (keyInfo.value !== undefined),
      value: keyInfo.value,
      operator: keyInfo.operator || null,
    };
  }