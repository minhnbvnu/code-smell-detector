function getShadowRoot(element) {
  return element.shadowRoot || shadowRoots.get(element) || null;
}