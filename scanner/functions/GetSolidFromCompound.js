function GetSolidFromCompound(shape, index, keepOriginal) {
  if (!shape || shape.ShapeType() > 1 || shape.IsNull()) { console.error("Not a compound shape!"); return shape; }
  if (!index) { index = 0;}

  let sol = CacheOp(arguments, () => {
    let innerSolid = {}; let solidsFound = 0;
    ForEachSolid(shape, (i, s) => {
      if (i === index) { innerSolid = new oc.TopoDS_Solid(s); } solidsFound++;
    });
    if (solidsFound === 0) { console.error("NO SOLIDS FOUND IN SHAPE!"); innerSolid = shape; }
    innerSolid.hash = shape.hash + 1;
    return innerSolid;
  });

  if (!keepOriginal) { sceneShapes = Remove(sceneShapes, shape); }
  sceneShapes.push(sol);

  return sol;
}