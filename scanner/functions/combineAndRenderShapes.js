function combineAndRenderShapes(payload) {
  // Initialize currentShape as an empty Compound Solid
  currentShape     = new oc.TopoDS_Compound();
  let sceneBuilder = new oc.BRep_Builder();
  sceneBuilder.MakeCompound(currentShape);
  let fullShapeEdgeHashes = {}; let fullShapeFaceHashes = {};
  postMessage({ "type": "Progress", "payload": { "opNumber": opNumber++, "opType": "Combining Shapes" } });

  // If there are sceneShapes, iterate through them and add them to currentShape
  if (sceneShapes.length > 0) {
    for (let shapeInd = 0; shapeInd < sceneShapes.length; shapeInd++) {
      if (!sceneShapes[shapeInd] || !sceneShapes[shapeInd].IsNull || sceneShapes[shapeInd].IsNull()) {
        console.error("Null Shape detected in sceneShapes; skipping: " + JSON.stringify(sceneShapes[shapeInd]));
        continue;
      }
      if (!sceneShapes[shapeInd].ShapeType) {
        console.error("Non-Shape detected in sceneShapes; " +
          "are you sure it is a TopoDS_Shape and not something else that needs to be converted to one?");
        console.error(JSON.stringify(sceneShapes[shapeInd]));
        continue;
      }

      // Scan the edges and faces and add to the edge list
      Object.assign(fullShapeEdgeHashes, ForEachEdge(sceneShapes[shapeInd], (index, edge) => { }));
      ForEachFace(sceneShapes[shapeInd], (index, face) => {
        fullShapeFaceHashes[face.HashCode(100000000)] = index;
      });

      sceneBuilder.Add(currentShape, sceneShapes[shapeInd]);
    }

    // Use ShapeToMesh to output a set of triangulated faces and discretized edges to the 3D Viewport
    postMessage({ "type": "Progress", "payload": { "opNumber": opNumber++, "opType": "Triangulating Faces" } });
    let facesAndEdges = ShapeToMesh(currentShape,
      payload.maxDeviation||0.1, fullShapeEdgeHashes, fullShapeFaceHashes);
    sceneShapes = [];
    postMessage({ "type": "Progress", "payload": { "opNumber": opNumber, "opType": "" } }); // Finish the progress
    return [facesAndEdges, payload.sceneOptions];
  } else {
    console.error("There were no scene shapes returned!");
  }
  postMessage({ "type": "Progress", "payload": { "opNumber": opNumber, "opType": "" } });
}