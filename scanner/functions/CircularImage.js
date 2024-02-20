function CircularImage(options, body, labelModule, imageObj) {
      _classCallCheck(this, CircularImage);

      _get(Object.getPrototypeOf(CircularImage.prototype), 'constructor', this).call(this, options, body, labelModule);
      this.imageObj = imageObj;
      this._swapToImageResizeWhenImageLoaded = true;
    }