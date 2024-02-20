function removeSharedStyle(context, rootObject){
  const style = rootObject.firstLayer().style();
  const fills = style.fills();
  const fillColor = (fills.count() > 0) ? style.fills()[0].color() : MSColor.blackColor();
  style.removeAllStyleFills();
  style.addStylePartOfType(0).color = fillColor;
  rootObject.firstLayer().sharedStyle = null;
}