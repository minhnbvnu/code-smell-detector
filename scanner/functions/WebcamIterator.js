function WebcamIterator(webcamVideoElement, webcamConfig) {
	    var _this;

	    _this = _LazyIterator.call(this) || this;
	    _this.webcamVideoElement = webcamVideoElement;
	    _this.webcamConfig = webcamConfig;
	    _this.isClosed = true;
	    _this.resize = false;

	    if (_this.needToResize()) {
	      _this.resize = true;
	      _this.cropSize = [_this.webcamConfig.resizeHeight, _this.webcamConfig.resizeWidth];
	      _this.cropBoxInd = tensor1d([0], 'int32');

	      if (_this.webcamConfig.centerCrop) {
	        // Calculate the box based on resizing shape.
	        var widthCroppingRatio = _this.webcamConfig.resizeWidth * 1.0 / _this.webcamVideoElement.width;
	        var heightCroppingRatio = _this.webcamConfig.resizeHeight * 1.0 / _this.webcamVideoElement.height;
	        var widthCropStart = (1 - widthCroppingRatio) / 2;
	        var heightCropStart = (1 - heightCroppingRatio) / 2;
	        var widthCropEnd = widthCropStart + widthCroppingRatio;
	        var heightCropEnd = heightCroppingRatio + heightCropStart;
	        _this.cropBox = tensor2d([heightCropStart, widthCropStart, heightCropEnd, widthCropEnd], [1, 4]);
	      } else {
	        _this.cropBox = tensor2d([0, 0, 1, 1], [1, 4]);
	      }
	    }

	    return _this;
	  }