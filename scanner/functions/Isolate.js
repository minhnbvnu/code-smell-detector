function Isolate(graph) {
    this.graph = graph;
    Isolate.__super__.constructor.apply(this, arguments);
  }