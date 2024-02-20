function intersectNode(nd, p1, root) {
  if (nd.useDef) {
    var definedFig = root.select('defs #' + nd.useDef).node();
    if (definedFig) {
      var outerFig = definedFig.childNodes[0];
      if (isCircle(outerFig) || isEllipse(outerFig)) {
        return intersectEllipse(nd, outerFig, p1);
      } else if (isPolygon(outerFig)) {
        return intersectPolygon(nd, outerFig, p1);
      }
    }
  }
  // TODO: use bpodgursky's shortening algorithm here
  return intersectRect(nd, p1);
}