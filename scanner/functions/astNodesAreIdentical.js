function astNodesAreIdentical(a, b) {
  // The horror!
  return escodegen.generate(a) === escodegen.generate(b);
}