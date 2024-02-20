function ShakePlugin(options) {
  this.options = Object.assign({
    warnings: {
      global: true,
      module: false
    }
  }, options);
}