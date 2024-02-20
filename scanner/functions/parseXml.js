function parseXml(xml, shape) {
  if (!shape) shape = {};
  switch (shape.type) {
    case 'structure': return parseStructure(xml, shape);
    case 'map': return parseMap(xml, shape);
    case 'list': return parseList(xml, shape);
    case undefined: case null: return parseUnknown(xml);
    default: return parseScalar(xml, shape);
  }
}