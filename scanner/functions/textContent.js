function textContent(node) {
  if (Array.isArray(node)) return node.map(textContent).join("");
  if ((0, domhandler_1.hasChildren)(node) && !(0, domhandler_1.isComment)(node)) {
    return textContent(node.children);
  }
  if ((0, domhandler_1.isText)(node)) return node.data;
  return "";
}