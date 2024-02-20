function deepMagicPatch(node) {
  // magic patch the whole ast
  full(node, function(child) {
    child.magic = true;
  });
}