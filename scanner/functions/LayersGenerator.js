function LayersGenerator(descriptors1, header1) {
    this.descriptors = descriptors1;
    this.header = header1;
    this.tryConvertHeaderInputToDataLayer = bind(this.tryConvertHeaderInputToDataLayer, this);
    this.tryConvertInputShapeEntryToDataLayer = bind(this.tryConvertInputShapeEntryToDataLayer, this);
    this.tryExtractDescriptorsFromHeader = bind(this.tryExtractDescriptorsFromHeader, this);
    this.generateRegularLayers = bind(this.generateRegularLayers, this);
    this.generate = bind(this.generate, this);
  }