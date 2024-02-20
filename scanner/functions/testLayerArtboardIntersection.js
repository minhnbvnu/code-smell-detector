function testLayerArtboardIntersection(lyr, ab) {
  if (lyr) {
    return layerIsVisible(lyr);
  } else {
    return some(doc.layers, layerIsVisible);
  }


  function layerIsVisible(lyr) {
    if (objectIsHidden(lyr)) return false;
    return some(lyr.layers, layerIsVisible) ||
      some(lyr.pageItems, itemIsVisible) ||
      some(lyr.groupItems, groupIsVisible);
  }

  function itemIsVisible(item) {
    if (item.hidden || item.guides || item.typename == "GroupItem") return false;
    return testBoundsIntersection(item.visibleBounds, ab.artboardRect);
  }

  function groupIsVisible(group) {
    if (group.hidden) return;
    return some(group.pageItems, itemIsVisible) ||
      some(group.groupItems, groupIsVisible);
  }
}