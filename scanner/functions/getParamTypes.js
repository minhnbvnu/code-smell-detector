function getParamTypes(key) {
  return Type => {
    return Reflect.getOwnMetadata(key, Type);
  };
}