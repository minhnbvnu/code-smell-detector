function createText(content) {
  const node = new _template.Text({});
  node[_xfa_object.$content] = content;
  return node;
}