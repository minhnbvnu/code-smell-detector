function newParsingContext() {
  return {
    variables: new Set(),
    properties: new Set(),
    featureId: false,
    geometryType: false,
    style: {},
  };
}