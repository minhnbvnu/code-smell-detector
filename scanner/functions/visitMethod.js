function visitMethod(traverse, node, path, state) {
  path.unshift(node);
  traverse(node.key, path, state);

  path.unshift(node.value);
  traverse(node.value.params, path, state);
  node.value.rest && traverse(node.value.rest, path, state);
  node.value.returnType && traverse(node.value.returnType, path, state);
  traverse(node.value.body, path, state);

  path.shift();

  path.shift();
  return false;
}