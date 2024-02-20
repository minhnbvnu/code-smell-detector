function BaseGraph() {
  // The value assigned to the graph itself.
  this._value = undefined;

  // Map of node id -> { id, value }
  this._nodes = {};

  // Map of edge id -> { id, u, v, value }
  this._edges = {};

  // Used to generate a unique id in the graph
  this._nextId = 0;
}