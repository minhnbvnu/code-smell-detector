function handleDoubleTap(evt) {
    var zoomFactor = this.zoomFactor || 2;
    var node = this.zoomNode;
    var pos = getPosition(node);
    this.currentScale = this.currentScale == 1 ? zoomFactor : 1;
    node.style.webkitTransform = generateTranslate(0, 0, 0, this.currentScale);
    if (this.currentScale != 1)
      node.style.webkitTransformOrigin = generateTransformOrigin(evt.touches[0].pageX - pos.left, evt.touches[0].pageY - pos.top);
  }