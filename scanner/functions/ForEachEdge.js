function ForEachEdge(shape, callback) {
  let edgeHashes = {};
  let edgeIndex = 0;
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_EDGE);
  for (anExplorer.Init(shape, oc.TopAbs_EDGE); anExplorer.More(); anExplorer.Next()) {
    let edge = oc.TopoDS.prototype.Edge(anExplorer.Current());
    let edgeHash = edge.HashCode(100000000);
    if(!edgeHashes.hasOwnProperty(edgeHash)){
      edgeHashes[edgeHash] = edgeIndex;
      callback(edgeIndex++, edge);
    }
  }
  return edgeHashes;
}