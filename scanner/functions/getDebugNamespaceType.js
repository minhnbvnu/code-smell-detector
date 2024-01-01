function getDebugNamespaceType (namespace) {
  var chunks = namespace.split(':');

  return chunks[chunks.length - 1];  // Return the last one
}