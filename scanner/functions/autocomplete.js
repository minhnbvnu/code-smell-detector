function autocomplete(code) {
  const wrappedCode = `function fn(xvizMetadataBuilder, xvizBuilder) {
    return ${removeComments(code)}
  }`;
  let instance;

  try {
    const func = eval(`(function() { return ${wrappedCode} })()`);
    instance = func(metadataBuilder, xvizBuilder);
  } catch (error) {
    // ignore
  }

  if (instance) {
    return getAutoCompleteSuggestions(instance);
  }
  return null;
}