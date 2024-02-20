function decodeHookMap(encodedHookMap) {
  return {
    names: encodedHookMap.names,
    mappings: decode(encodedHookMap.mappings)
  };
}