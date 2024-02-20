function unpackJsonArrays(json, buffers, options = {}) {
  return unpackJsonArraysRecursive(json, json, buffers, options);
}