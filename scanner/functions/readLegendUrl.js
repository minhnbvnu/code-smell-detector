function readLegendUrl(node, objectStack) {
  const legend = {};
  legend['format'] = node.getAttribute('format');
  legend['href'] = readHref(node);
  return legend;
}