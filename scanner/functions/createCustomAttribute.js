function createCustomAttribute(definition = {}) {
  return {
    ...definition,
    type: "custom",
  };
}