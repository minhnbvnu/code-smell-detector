function PoolingLayer(attribs) {
    this.getKernelSizes = bind(this.getKernelSizes, this);
    this.checkParameters = bind(this.checkParameters, this);
    this.inferShapes = bind(this.inferShapes, this);
    var params;
    this.spatialDimSize = 2;
    params = attribs != null ? attribs.pooling_param : void 0;
    if (params == null) {
      throw 'Pooling layer must have pooling_param.';
    }
    this.padding = extractPaddingSizes(params);
    this.stride = extractStrideSizes(params);
    this.kernel = extractKernelSizes(params);
    this.isGlobalPooling = getValueOrDefault(params.global_pooling, false);
  }