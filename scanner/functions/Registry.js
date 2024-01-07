constructor() {
    this.controllers = new TypedRegistry(DatasetController, 'datasets', true);
    this.elements = new TypedRegistry(Element, 'elements');
    this.plugins = new TypedRegistry(Object, 'plugins');
    this.scales = new TypedRegistry(Scale, 'scales');
    // Order is important, Scale has Element in prototype chain,
    // so Scales must be before Elements. Plugins are a fallback, so not listed here.
    this._typedRegistries = [this.controllers, this.scales, this.elements];
  }