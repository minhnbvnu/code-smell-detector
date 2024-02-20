function innerText(node) {
  if (Array.isArray(node)) return node.map(innerText).join("");
  if ((0, domhandler_1.hasChildren)(node) && (node.type === domelementtype_1.ElementType.Tag || (0, domhandler_1.isCDATA)(node))) {
    return innerText(node.children);
  }
  if ((0, domhandler_1.isText)(node)) return node.data;
  return "";
}