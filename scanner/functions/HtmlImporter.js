function HtmlImporter( config ) {
  this.config = config || {};
  this.nodeTypesByName = {};
  this.nodeTypes = [];
  this.blockTypes = [];
  this.inlineTypes = [];
  // register converters defined in schema
  if (this.config.schema) {
    this.config.schema.each(function(NodeClass) {
      this.defineNodeImporter(NodeClass);
    }, this);
  }
  this.$ = global.$;
}