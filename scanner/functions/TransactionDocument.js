function TransactionDocument(document) {
  AbstractDocument.call(this, document.schema);
  this.__id__ = "TX_"+__id__++;

  this.document = document;
  // ops recorded since transaction start
  this.ops = [];
  // app information state information used to recover the state before the transaction
  // when calling undo
  this.before = {};
  // HACK: copying all indexes
  _.each(document.data.indexes, function(index, name) {
    this.data.addIndex(name, index.clone());
  }, this);

  this.loadSeed(document.toJSON());
}