function DeconvolutionLayer(attribs) {
    this.inferShapesForOneBlobInternal = bind(this.inferShapesForOneBlobInternal, this);
    DeconvolutionLayer.__super__.constructor.call(this, 'Deconvolution', attribs);
  }