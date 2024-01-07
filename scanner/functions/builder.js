constructor() {
    this._namespaceStack = [];
    this._namespacePrefixes = new Map();
    this._namespaces = new Map();
    this._nextNsId = Math.max(...Object.values(_namespaces.NamespaceIds).map(({
      id
    }) => id));
    this._currentNamespace = new _unknown.UnknownNamespace(++this._nextNsId);
  }