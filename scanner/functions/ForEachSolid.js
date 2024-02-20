function ForEachSolid(shape, callback) {
  let solid_index = 0;
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_SOLID);
  for (anExplorer.Init(shape, oc.TopAbs_SOLID); anExplorer.More(); anExplorer.Next()) {
    callback(solid_index++, oc.TopoDS.prototype.Solid(anExplorer.Current()));
  }
}