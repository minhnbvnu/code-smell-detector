constructor(basePathSegments, createNative) {
    this.basePathSegments = basePathSegments;
    this.root = new RegistryNode();
    this.createNative = createNative;
  }