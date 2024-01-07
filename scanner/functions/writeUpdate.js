function writeUpdate(node, feature, objectStack) {
  const context = objectStack[objectStack.length - 1];
  assert(feature.getId() !== undefined, 'Features must have an id set');
  const version = context['version'];
  const featureType = context['featureType'];
  const featurePrefix = context['featurePrefix'];
  const featureNS = context['featureNS'];
  const typeName = getTypeName(featurePrefix, featureType);
  const geometryName = feature.getGeometryName();
  node.setAttribute('typeName', typeName);
  node.setAttributeNS(XMLNS, 'xmlns:' + featurePrefix, featureNS);
  const fid = feature.getId();
  if (fid !== undefined) {
    const keys = feature.getKeys();
    const values = [];
    for (let i = 0, ii = keys.length; i < ii; i++) {
      const value = feature.get(keys[i]);
      if (value !== undefined) {
        let name = keys[i];
        if (
          value &&
          typeof (/** @type {?} */ (value).getSimplifiedGeometry) === 'function'
        ) {
          name = geometryName;
        }
        values.push({name: name, value: value});
      }
    }
    pushSerializeAndPop(
      /** @type {import("../xml.js").NodeStackItem} */ ({
        version,
        'gmlVersion': context['gmlVersion'],
        node,
        'hasZ': context['hasZ'],
        'srsName': context['srsName'],
      }),
      TRANSACTION_SERIALIZERS,
      makeSimpleNodeFactory('Property'),
      values,
      objectStack,
    );
    writeOgcFidFilter(node, fid, objectStack);
  }
}