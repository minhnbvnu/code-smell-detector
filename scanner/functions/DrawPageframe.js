function DrawPageframe(opts) {
    this.rootNode = getRootNode(opts.rootNode) || document.body;
    this.offsetTop = opts.offsetTop || 0;
    this.includeElement = opts.includeElement;
    this.init = opts.init;
    this.originStyle = {};

    return this instanceof DrawPageframe ? this : new DrawPageframe(opts); 
  }