function ForEachWire(shape, callback) {
  let wire_index = 0;
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_WIRE);
  for (anExplorer.Init(shape, oc.TopAbs_WIRE); anExplorer.More(); anExplorer.Next()) {
    callback(wire_index++, oc.TopoDS.prototype.Wire(anExplorer.Current()));
  }
}