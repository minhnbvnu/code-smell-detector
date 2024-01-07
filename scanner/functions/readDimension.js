function readDimension(node, objectStack) {
  const dimensionObject = {
    'name': node.getAttribute('name'),
    'units': node.getAttribute('units'),
    'unitSymbol': node.getAttribute('unitSymbol'),
    'default': node.getAttribute('default'),
    'multipleValues': readBooleanString(node.getAttribute('multipleValues')),
    'nearestValue': readBooleanString(node.getAttribute('nearestValue')),
    'current': readBooleanString(node.getAttribute('current')),
    'values': readString(node),
  };
  return dimensionObject;
}