function getUntransformedTextBounds(textFrame) {
  var copy = textFrame.duplicate(textFrame.parent, ElementPlacement.PLACEATEND);
  var matrix = clearMatrixShift(textFrame.matrix);
  copy.transform(app.invertMatrix(matrix));
  var bnds = copy.geometricBounds;
  if (textFrame.kind == TextType.AREATEXT) {
    // prevent offcenter problem caused by extra vertical space in text area
    // TODO: de-kludge
    // this would be much simpler if <TextFrameItem>.convertAreaObjectToPointObject()
    // worked correctly (throws MRAP error when trying to remove a converted object)
    var textWidth = (bnds[2] - bnds[0]);
    copy.transform(matrix);
    // Transforming outlines avoids the offcenter problem, but width of bounding
    // box needs to be set to width of transformed TextFrame for correct output
    copy = copy.createOutline();
    copy.transform(app.invertMatrix(matrix));
    bnds = copy.geometricBounds;
    var dx = Math.ceil(textWidth - (bnds[2] - bnds[0])) / 2;
    bnds[0] -= dx;
    bnds[2] += dx;
  }
  copy.remove();
  return bnds;
}