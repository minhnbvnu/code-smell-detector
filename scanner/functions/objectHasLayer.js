function objectHasLayer(obj) {
  var hasLayer = false;
  try {
    hasLayer = !!obj.layer;
  } catch(e) {
    // trying to access the layer property of a placed item that is used as an opacity mask
    // throws an error (as of Illustrator 2018)
  }
  return hasLayer;
}