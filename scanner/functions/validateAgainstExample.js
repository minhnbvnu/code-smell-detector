function validateAgainstExample(t, validator, protoType, protoEnumTypes, examplePath, jsonExample) {
  const originalJsonExample = clone(jsonExample);

  protoEnumsToInts(protoType, jsonExample, protoEnumTypes);

  // Sanity check out input data
  const schemaName = protoType.options[EXTENSION_PROPERTY];
  validateXVIZJSON(t, validator, schemaName, originalJsonExample, 'Example JSON');

  // Verify content "works" as protobuf
  verifyProto(t, protoType, jsonExample, `Protobuf verified`);

  // Populate proto object with content, we do "fromObject" first
  // so that the well known types will be handled
  const protoObject = protoType.fromObject(jsonExample);
  const serializedProtoData = protoType.encode(protoObject).finish();
  const protoData = protoType.decode(serializedProtoData);

  // Dump to Object
  const options = {
    enums: String, // Use strings instead of numbers
    bytes: Array // Explicitly use Array format for bytes
  };
  const fromProtoObject = protoType.toObject(protoData, options);
  convertImagesToBase64(fromProtoObject);

  // Validate JSON with JSON schema
  validateXVIZJSON(t, validator, schemaName, fromProtoObject, 'Proto round trip JSON');

  // Now lets make sure we handled all fields
  if (!exampleHasExtraFields(examplePath)) {
    diffDeepEquals(t, originalJsonExample, fromProtoObject, `Full round trip equivalent`);
  }
}