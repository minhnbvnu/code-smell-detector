function DataLayer(attribs) {
    this.tryExtractShapeFromMemoryDataLayer = bind(this.tryExtractShapeFromMemoryDataLayer, this);
    this.tryExtractShapeFromTransformParam = bind(this.tryExtractShapeFromTransformParam, this);
    this.tryExtractShapes = bind(this.tryExtractShapes, this);
    this.checkParameters = bind(this.checkParameters, this);
    this.inferShapes = bind(this.inferShapes, this);
    this.defaultBatchSize = 1;
    this.defaultChannels = 3;
    this.outputShape = this.tryExtractShapes(attribs);
  }