function AbstractDocument(schema) {
  Substance.EventEmitter.call(this);
  this.schema = schema;

  this.AUTO_ATTACH = true;
  this.FOR_CLIPBOARD = false;

  this.data = new Data.Incremental(schema, {
    didCreateNode: _.bind(this._didCreateNode, this),
    didDeleteNode: _.bind(this._didDeleteNode, this),
  });
}