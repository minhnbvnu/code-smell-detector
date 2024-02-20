function ForEachVertex(shape, callback) {
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_VERTEX);
  for (anExplorer.Init(shape, oc.TopAbs_VERTEX); anExplorer.More(); anExplorer.Next()) {
    callback(oc.TopoDS.prototype.Vertex(anExplorer.Current()));
  }
}