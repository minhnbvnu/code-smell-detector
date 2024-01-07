function writeFeature(node, feature, objectStack) {
  const context = objectStack[objectStack.length - 1];
  const featureType = context['featureType'];
  const featureNS = context['featureNS'];
  const gmlVersion = context['gmlVersion'];
  const child = createElementNS(featureNS, featureType);
  node.appendChild(child);
  if (gmlVersion === 2) {
    GML2.prototype.writeFeatureElement(child, feature, objectStack);
  } else if (gmlVersion === 3) {
    GML3.prototype.writeFeatureElement(child, feature, objectStack);
  } else {
    GML32.prototype.writeFeatureElement(child, feature, objectStack);
  }
}