function ConvolutionLayerBase(name1, attribs) {
    var params;
    this.name = name1;
    this.checkParameters = bind(this.checkParameters, this);
    this.inferShapesForOneBlobInternal = bind(this.inferShapesForOneBlobInternal, this);
    this.inferShapesForOneBlob = bind(this.inferShapesForOneBlob, this);
    this.inferShapes = bind(this.inferShapes, this);
    params = attribs != null ? attribs.convolution_param : void 0;
    if (params == null) {
      throw this.name + " layer must have convolution_param.";
    }
    this.filters = params.num_output;
    this.padding = extractPaddingSizes(params);
    this.stride = extractStrideSizes(params);
    this.kernel = extractKernelSizes(params);
    this.dilation = getValueOrDefault(params.dilation, 1);
    this.axis = getValueOrDefault(params.axis, 1);
  }