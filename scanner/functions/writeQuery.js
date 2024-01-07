function writeQuery(node, featureType, objectStack) {
  const context = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  const version = context['version'];
  const featurePrefix = context['featurePrefix'];
  const featureNS = context['featureNS'];
  const propertyNames = context['propertyNames'];
  const srsName = context['srsName'];
  let typeName;
  // If feature prefix is not defined, we must not use the default prefix.
  if (featurePrefix) {
    typeName = getTypeName(featurePrefix, featureType);
  } else {
    typeName = featureType;
  }
  let typeNameAttr;
  if (version === '2.0.0') {
    typeNameAttr = 'typeNames';
  } else {
    typeNameAttr = 'typeName';
  }
  node.setAttribute(typeNameAttr, typeName);
  if (srsName) {
    node.setAttribute('srsName', srsName);
  }
  if (featureNS) {
    node.setAttributeNS(XMLNS, 'xmlns:' + featurePrefix, featureNS);
  }
  const item = /** @type {import("../xml.js").NodeStackItem} */ (
    Object.assign({}, context)
  );
  item.node = node;
  pushSerializeAndPop(
    item,
    QUERY_SERIALIZERS,
    makeSimpleNodeFactory('PropertyName'),
    propertyNames,
    objectStack,
  );
  const filter = context['filter'];
  if (filter) {
    const child = createElementNS(getFilterNS(version), 'Filter');
    node.appendChild(child);
    writeFilterCondition(child, filter, objectStack);
  }
}