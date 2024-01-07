function onDrawend(e) {
  const edgeGeom = e.feature.getGeometry().getCoordinates();
  const startCoord = edgeGeom[0];
  const endCoord = edgeGeom[edgeGeom.length - 1];
  let start, end;
  try {
    start = topo.getNodeByPoint(startCoord);
    end = topo.getNodeByPoint(endCoord);
    const edgesAtStart = topo.getEdgeByPoint(startCoord, 5);
    const edgesAtEnd = topo.getEdgeByPoint(endCoord, 5);
    const crossing = topo.getEdgesByLine(edgeGeom);
    if (
      crossing.length === 1 &&
      !start &&
      !end &&
      edgesAtStart.length === 0 &&
      edgesAtEnd.length === 0
    ) {
      topo.remEdgeNewFace(crossing[0]);
      start = crossing[0].start;
      if (start.face) {
        topo.removeIsoNode(start);
      }
      end = crossing[0].end;
      if (end.face) {
        topo.removeIsoNode(end);
      }
      return;
    }
    if (!start) {
      start = createNode(topo, startCoord);
      edgeGeom[0] = start.coordinate;
    }
    if (!end) {
      end = createNode(topo, endCoord);
      edgeGeom[edgeGeom.length - 1] = end.coordinate;
    }
    topo.addEdgeNewFaces(start, end, edgeGeom);
  } catch (e) {
    toastr.warning(e.toString());
  }
}