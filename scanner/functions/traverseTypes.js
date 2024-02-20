function traverseTypes(current, fn) {
  if (current instanceof Type)
    // and/or protobuf.Enum, protobuf.Service etc.
    fn(current);
  if (current.nestedArray)
    current.nestedArray.forEach(function eachType(nested) {
      traverseTypes(nested, fn);
    });
}