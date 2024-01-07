function writeIconStyle(node, style, objectStack) {
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};
  const /** @type {Object<string, any>} */ properties = {};
  const src = style.getSrc();
  const size = style.getSize();
  const iconImageSize = style.getImageSize();
  const iconProperties = {
    'href': src,
  };

  if (size) {
    iconProperties['w'] = size[0];
    iconProperties['h'] = size[1];
    const anchor = style.getAnchor(); // top-left
    const origin = style.getOrigin(); // top-left

    if (origin && iconImageSize && origin[0] !== 0 && origin[1] !== size[1]) {
      iconProperties['x'] = origin[0];
      iconProperties['y'] = iconImageSize[1] - (origin[1] + size[1]);
    }

    if (anchor && (anchor[0] !== size[0] / 2 || anchor[1] !== size[1] / 2)) {
      const /** @type {Vec2} */ hotSpot = {
          x: anchor[0],
          xunits: 'pixels',
          y: size[1] - anchor[1],
          yunits: 'pixels',
        };
      properties['hotSpot'] = hotSpot;
    }
  }

  properties['Icon'] = iconProperties;

  let scale = style.getScaleArray()[0];
  let imageSize = size;
  if (imageSize === null) {
    imageSize = DEFAULT_IMAGE_STYLE_SIZE;
  }
  if (imageSize.length == 2) {
    const resizeScale = scaleForSize(imageSize);
    scale = scale / resizeScale;
  }
  if (scale !== 1) {
    properties['scale'] = scale;
  }

  const rotation = style.getRotation();
  if (rotation !== 0) {
    properties['heading'] = rotation; // 0-360
  }

  const color = style.getColor();
  if (color) {
    properties['color'] = color;
  }

  const parentNode = objectStack[objectStack.length - 1].node;
  const orderedKeys = ICON_STYLE_SEQUENCE[parentNode.namespaceURI];
  const values = makeSequence(properties, orderedKeys);
  pushSerializeAndPop(
    context,
    ICON_STYLE_SERIALIZERS,
    OBJECT_PROPERTY_NODE_FACTORY,
    values,
    objectStack,
    orderedKeys,
  );
}