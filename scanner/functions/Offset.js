function Offset(shape, offsetDistance, tolerance, keepShape) {
  if (!shape || shape.IsNull()) { console.error("Offset received Null Shape!"); }
  if (!tolerance) { tolerance = 0.1; }
  if (offsetDistance === 0.0) { return shape; }
  let curOffset = CacheOp(arguments, () => {
    let offset = null;
    if (shape.ShapeType() === 5) {
      offset = new oc.BRepOffsetAPI_MakeOffset();
      offset.AddWire(shape);
      offset.Perform(offsetDistance);
    } else {
      offset = new oc.BRepOffsetAPI_MakeOffsetShape();
      offset.PerformByJoin(shape, offsetDistance, tolerance);
    }
    let offsetShape = new oc.TopoDS_Shape(offset.Shape());

    // Convert Shell to Solid as is expected
    if (offsetShape.ShapeType() == 3) {
      let solidOffset = new oc.BRepBuilderAPI_MakeSolid();
      solidOffset.Add(offsetShape);
      offsetShape = new oc.TopoDS_Solid(solidOffset.Solid());
    }
    
    return offsetShape;
  });
  
  if (!keepShape) { sceneShapes = Remove(sceneShapes, shape); }
  sceneShapes.push(curOffset);
  return curOffset;
}