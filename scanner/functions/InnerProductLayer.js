function InnerProductLayer(attribs) {
    this.checkParameters = bind(this.checkParameters, this);
    this.inferShapes = bind(this.inferShapes, this);
    var params;
    params = attribs != null ? attribs.inner_product_param : void 0;
    if (params == null) {
      throw 'InnerProduct layer must have inner_product_param.';
    }
    this.numOutput = params.num_output;
    this.axis = getValueOrDefault(params.axis, 1);
  }