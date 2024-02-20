function getProtoEnumTypes(protoTypeObj) {
  const enumTypes = {};

  protoTypeObj.nestedArray.map(function store(e) {
    if (e.values !== undefined) {
      // enumTypes[e.name] = e.values;
      enumTypes[e.fullName] = e.values;
    } else if (e.nestedArray !== undefined) {
      Object.assign(enumTypes, getProtoEnumTypes(e));
    }
  });

  return enumTypes;
}