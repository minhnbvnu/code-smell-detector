function drawCollageItems(layerItems) {
  for (var i = 0; i < layerItems.length; i++) {
    push();
    translate(layerItems[i].x, layerItems[i].y);
    rotate(layerItems[i].rotation);
    scale(layerItems[i].scaling);
    image(layerItems[i].image, 0, 0);
    pop();
  }
}