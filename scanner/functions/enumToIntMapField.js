function enumToIntMapField(field, jsonObject, enumTypes) {
  if (!PRIMITIVE_PROTO_TYPES.has(field.type) && jsonObject !== undefined) {
    const subType = field.parent.lookupType(field.type);

    for (const propertyName in jsonObject) {
      if (jsonObject.hasOwnProperty(propertyName)) {
        const propertyValue = jsonObject[propertyName];
        protoEnumsToInts(subType, propertyValue, enumTypes);
      }
    }
  }
}