function enumToIntRepeatedField(field, jsonArray, enumTypes) {
  if (!PRIMITIVE_PROTO_TYPES.has(field.type) && jsonArray !== undefined) {
    const subType = field.parent.lookupType(field.type);

    for (let i = 0; i < jsonArray.length; i++) {
      protoEnumsToInts(subType, jsonArray[i], enumTypes);
    }
  }
}