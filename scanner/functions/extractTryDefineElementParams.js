function extractTryDefineElementParams(params, elementDefinitionType, elementDefinitionCallback) {
  if (typeof params === "string") {
    return {
      name: params,
      type: elementDefinitionType,
      callback: elementDefinitionCallback
    };
  } else {
    return params;
  }
}