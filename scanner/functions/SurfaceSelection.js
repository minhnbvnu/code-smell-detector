function SurfaceSelection(rootElement, doc, container) {
  this.element = rootElement;
  this.doc = doc;
  this.container = container;
  this.state = new SurfaceSelection.State();
}