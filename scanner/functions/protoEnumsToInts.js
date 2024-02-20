function protoEnumsToInts(protoType, jsonObject, enumTypes) {
  if (enumTypes === undefined) {
    throw 'protoEnumsToInts needs defined enumTypes';
  }

  const fields = protoType.fields;

  // Fix up fields
  for (const fieldName in fields) {
    if (fields.hasOwnProperty(fieldName)) {
      const field = fields[fieldName];
      const fieldValue = jsonObject[fieldName];

      const values = lookUpEnumValues(protoType, field.type, enumTypes);
      // console.log(
      //   `${protoType.fullName} ${field.fullName}: ${field.type} values: ${JSON.stringify(values)}`
      // );

      if (values !== undefined) {
        enumToIntField(values, fieldName, jsonObject);
      } else if (field.map) {
        enumToIntMapField(field, jsonObject[fieldName], enumTypes);
      } else if (field.repeated) {
        enumToIntRepeatedField(field, jsonObject[fieldName], enumTypes);
      } else if (typeof fieldValue === 'object') {
        enumToIntMessageField(field, fieldValue, enumTypes);
      }
    }
  }
}