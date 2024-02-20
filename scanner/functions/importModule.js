function importModule(moduleId) {
    const /** Polymer.DomModule */ PolymerDomModule = customElements.get('dom-module');
    if (!PolymerDomModule) {
      return null;
    }
    return PolymerDomModule.import(moduleId);
  }