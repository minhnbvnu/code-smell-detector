function removeMask(context, rootObject) {

  context.command.setValue_forKey_onLayer(null, "colorLib", rootObject)
  context.command.setValue_forKey_onLayer(null, "color", rootObject)
  context.command.setValue_forKey_onLayer(null, "source", rootObject)
  context.command.setValue_forKey_onLayer(null, "colorPicker", rootObject)

  if (utils.svgHasStroke(rootObject)) {
    return applyColor(rootObject, { colorPicker: MSImmutableColor.blackColor() })
  }

  const iconLayer = rootObject.firstLayer();

  if (rootObject.layers().count() > 1 && iconLayer.hasClippingMask()) {
    iconLayer.hasClippingMask = false;
    iconLayer.clippingMaskMode = 1;
    const style = rootObject.firstLayer().style();
    const fills = style.fills();
    const fillColor = (fills.count() > 0) ? style.fills()[0].color() : MSColor.blackColor();
    style.removeAllStyleFills();
    style.addStylePartOfType(0).color = fillColor;
    rootObject.lastLayer().removeFromParent()
  }
}