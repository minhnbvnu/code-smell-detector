function scopeIdentifier(node) {
    scopeIdentifierName(node.name);
    attachScope(node, true);
  }