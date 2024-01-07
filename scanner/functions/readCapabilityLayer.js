function readCapabilityLayer(node, objectStack) {
  const layerObject = pushParseAndPop({}, LAYER_PARSERS, node, objectStack);

  if (layerObject['Layer'] === undefined) {
    return Object.assign(layerObject, readLayer(node, objectStack));
  }

  return layerObject;
}