function drawCollageitems(layerItems) {
  for (var i = 0; i < layerItems.length; i++) {
    push();
    translate(
      width / 2 + cos(layerItems[i].a) * layerItems[i].l,
      height / 2 + sin(layerItems[i].a) * layerItems[i].l
    );
    rotate(layerItems[i].rotation);
    scale(layerItems[i].scaling);
    image(layerItems[i].image, 0, 0);
    pop();
  }
}