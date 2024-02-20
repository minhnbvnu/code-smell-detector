function findInspectorElement(kind) {
  for (let element of document.body.children) {
    if (element.id.startsWith(`ember-inspector-${kind}-`)) {
      return element;
    }
  }

  throw new Error(`Cannot find ${kind} inspector element`);
}