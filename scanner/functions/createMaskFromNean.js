function createMaskFromNean(context, rootObject, color) {
  const currentRootObjectSize = rootObject.rect()

  const mask = MSShapeGroup.shapeWithRect({
    origin: { x: 0, y: 0 },
    size: { width: currentRootObjectSize.size.width, height: currentRootObjectSize.size.height }
  })

  const fill = mask.style().addStylePartOfType(0);
  fill.color = color;

  return mask
}