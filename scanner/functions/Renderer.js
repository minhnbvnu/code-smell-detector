function Renderer() {
  // Set up defaults...
  this._layout = layout();

  this.drawNodes(defaultDrawNodes);
  this.drawEdgeLabels(defaultDrawEdgeLabels);
  this.drawEdgePaths(defaultDrawEdgePaths);
  this.positionNodes(defaultPositionNodes);
  this.positionEdgeLabels(defaultPositionEdgeLabels);
  this.positionEdgePaths(defaultPositionEdgePaths);
  this.zoomSetup(defaultZoomSetup);
  this.zoom(defaultZoom);
  this.transition(defaultTransition);
  this.postLayout(defaultPostLayout);
  this.postRender(defaultPostRender);

  this.edgeInterpolate('bundle');
  this.edgeTension(0.95);
}