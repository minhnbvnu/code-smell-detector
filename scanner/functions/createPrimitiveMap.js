function createPrimitiveMap() {
  const result = {};
  for (const key in PRIMITIVE_CAT) {
    result[PRIMITIVE_CAT[key]] = [];
  }
  return result;
}