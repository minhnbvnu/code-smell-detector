function enumToIntMessageField(field, jsonObject, enumTypes) {
  if (!PRIMITIVE_PROTO_TYPES.has(field.type) && jsonObject !== undefined) {
    const subType = field.parent.lookupType(field.type);
    protoEnumsToInts(subType, jsonObject, enumTypes);
  }
}