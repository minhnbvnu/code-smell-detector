function d3_selection_creator(name) {
    return typeof name === "function" ? name : (name = d3.ns.qualify(name)).local ? function() {
      return d3_document.createElementNS(name.space, name.local);
    } : function() {
      return d3_document.createElementNS(this.namespaceURI, name);
    };
  }