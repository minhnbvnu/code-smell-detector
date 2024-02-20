function whitespaceFilter(value, index, array) {
  return value.nodeType !== Node.TEXT_NODE ? true : typeof value.nodeValue === "string" && !!value.nodeValue.trim().length;
}