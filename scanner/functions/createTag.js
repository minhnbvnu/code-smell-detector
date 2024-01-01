function createTag (tagObj) {
  if (!tagObj || !tagObj.tagName) { return; }
  var meta = document.createElement(tagObj.tagName);
  meta.setAttribute(constants.AFRAME_INJECTED, '');
  return extend(meta, tagObj.attributes);
}