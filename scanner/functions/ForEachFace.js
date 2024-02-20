function ForEachFace(shape, callback) {
  let face_index = 0;
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_FACE);
  for (anExplorer.Init(shape, oc.TopAbs_FACE); anExplorer.More(); anExplorer.Next()) {
    callback(face_index++, oc.TopoDS.prototype.Face(anExplorer.Current()));
  }
}