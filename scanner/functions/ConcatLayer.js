function ConcatLayer(attribs) {
    this.checkInputShapeAxes = bind(this.checkInputShapeAxes, this);
    this.checkParameters = bind(this.checkParameters, this);
    this.inferShapes = bind(this.inferShapes, this);
    var axis, params;
    params = attribs != null ? attribs.concat_param : void 0;
    axis = params != null ? params.concat_dim : void 0;
    if (axis == null) {
      axis = params != null ? params.axis : void 0;
    }
    this.axis = getValueOrDefault(axis, 1);
  }