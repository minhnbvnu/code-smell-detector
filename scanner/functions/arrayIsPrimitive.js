function arrayIsPrimitive(value) {
  return (
    isTypedArray(value) ||
    arrayContainsPrimitives(value) ||
    arrayContainsDates(value)
  );
}