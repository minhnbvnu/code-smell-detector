function isSimpleProperty(node) {
  return node != null && node.type === "Property" && node.kind === "init" && node.method === false;
}