function MockPlugin(configuration) {
  configuration = configuration || {};

  this.version = configuration.version || version.raw;
  this.handler = configuration.handler || null;
  this.extensibilityPoints = configuration.extensibilityPoints || [];
}