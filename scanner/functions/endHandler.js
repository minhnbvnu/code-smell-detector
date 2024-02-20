function endHandler(evt) {
    var result = 0;
    if (this.gesture === 2) {
      //双手指 todo
      this._resetImage(evt);
      result = 2;
    } else if (this.gesture == 1) {
      //放大拖拽 todo
      this._resetImage(evt);
      result = 1;
    } else if (this.gesture === 3) {
      //双击
      this._handleDoubleTap(evt);
      this._resetImage(evt);
    }
    return result;
  }