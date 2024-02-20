function scaleImage(evt) {
    var moveTouces = getTouches(evt.targetTouches);
    var scale = calculateScale(this.startTouches, moveTouces);
    evt.scale = evt.scale || scale;
    var node = this.zoomNode;
    scale = this.currentScale * evt.scale < minScale ? minScale : this.currentScale * evt.scale;
    node.style.webkitTransform = generateTranslate(0, 0, 0, scale);
  }