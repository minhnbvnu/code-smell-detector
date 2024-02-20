function getXVIZProtoTypes(protoRoot) {
  const protoTypes = [];

  traverseTypes(protoRoot, type => {
    if (type.options !== undefined) {
      if (type.options[EXTENSION_PROPERTY] !== undefined) {
        protoTypes.push(type);
      }
    }
  });

  return protoTypes;
}