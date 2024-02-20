function generateCollageItems(layerImages, count, angle, length, rangeA, rangeL, scaleStart, scaleEnd, rotationStart, rotationEnd) {
  var layerItems = [];
  for (var i = 0; i < layerImages.length; i++) {
    for (var j = 0; j < count; j++) {
      var collageItem = new CollageItem(layerImages[i]);
      collageItem.a = angle + random(-rangeA / 2, rangeA / 2);
      collageItem.l = length + random(-rangeL / 2, rangeL / 2);
      collageItem.scaling = random(scaleStart, scaleEnd);
      collageItem.rotation = collageItem.a + HALF_PI + random(rotationStart, rotationEnd);
      layerItems.push(collageItem);
    }
  }
  return layerItems;
}