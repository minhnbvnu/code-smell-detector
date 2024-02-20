function ConvolutionLayer(attribs) {
    this.inferShapesForOneBlobInternal = bind(this.inferShapesForOneBlobInternal, this);
    ConvolutionLayer.__super__.constructor.call(this, 'Convolution', attribs);
  }