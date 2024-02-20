function Graph() {
  BaseGraph.call(this);

  /*! Map of nodeId -> { otherNodeId -> Set of edge ids } */
  this._incidentEdges = {};
}