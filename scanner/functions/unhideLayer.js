function unhideLayer(lyr) {
  while(lyr.typename == "Layer") {
    lyr.visible = true;
    lyr = lyr.parent;
  }
}