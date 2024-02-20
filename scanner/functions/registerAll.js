function registerAll(Shopify) {
  Object.entries(map).forEach(([resourceName, importResource]) => {
    Object.defineProperty(Shopify.prototype, resourceName, {
      configurable: true,
      get: function get() {
        const resource = importResource();

        return Object.defineProperty(this, resourceName, {
          value: new resource(this)
        })[resourceName];
      },
      set: function set(value) {
        Object.defineProperty(this, resourceName, { value });
      }
    });
  });
}