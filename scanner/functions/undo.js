function undo(g) {
  g.eachEdge(function(e, s, t, a) {
    if (a.reversed) {
      delete a.reversed;
      g.delEdge(e);
      g.addEdge(e, t, s, a);
    }
  });
}