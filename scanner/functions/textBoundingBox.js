function textBoundingBox(text) {
  var textObj = element_object(text);
  if (!textObj) return null;

  var bounding;
  if (textObj.children.length > 0) bounding = multiLineTextBoundingBox(textObj);else bounding = singleLineTextBoundingBox(textObj);
  return bounding;
}