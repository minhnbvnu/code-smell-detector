function ModuleTransport(data) {
  this.name = data.name;

  assertExists(data, 'id');
  this.id = data.id;

  assertExists(data, 'code');
  this.code = data.code;

  assertExists(data, 'sourceCode');
  this.sourceCode = data.sourceCode;

  assertExists(data, 'sourcePath');
  this.sourcePath = data.sourcePath;

  this.virtual = data.virtual;
  this.meta = data.meta;
  this.polyfill = data.polyfill;
  this.map = data.map;

  Object.freeze(this);
}