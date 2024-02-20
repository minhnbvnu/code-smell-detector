function moveImage(evt) {
    var node = this.zoomNode;
    var device = this._device();
    var offset = {
      X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
      Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
    };
    this.moveOffset = {
      x: this._startX + offset.X - 0,
      y: this._startY + offset.Y - 0
    };
    node.style.webkitTransform = generateTranslate(this.moveOffset.x, this.moveOffset.y, 0, this.currentScale);
  }