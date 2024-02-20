function inferConstructorType(service) {
  if (v.isNameEntityRecordType(service) || v.isNameModelRecordType(service)) {
    return ConstructorTypes.v1Map;
  } else if (v.isBetaServiceConfig(service)) {
    return ConstructorTypes.beta;
  } else if (v.isStringHasLength(service)) {
    return ConstructorTypes.v1;
  } else {
    return ConstructorTypes.unknown;
  }
}