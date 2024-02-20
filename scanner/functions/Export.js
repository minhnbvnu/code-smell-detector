function Export(node, isDefinition) {
    this.node = node;                 // the AST node declaring this individual export
    this.isDefinition = isDefinition; // is the node an 'export'-annotated definition?
    this.resolved = null;             // resolved pointer to the target of this export
}