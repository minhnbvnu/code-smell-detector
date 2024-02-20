function generateEncodedHookMap(sourceAST) {
  const hookMap = generateHookMap(sourceAST);
  const encoded = encode(hookMap.mappings);
  return {
    names: hookMap.names,
    mappings: encoded
  };
}