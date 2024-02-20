function CropLayer(attribs) {
    this.checkParameters = bind(this.checkParameters, this);
    this.inferShapes = bind(this.inferShapes, this);
    var params;
    params = attribs.crop_param;
    this.axis = getValueOrDefault(params != null ? params.axis : void 0, 0);
  }