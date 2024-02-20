function postResult(items, position, tri) {
  const res = {
    items: items,
    position: position,
    vertices: new Float32Array(tri.vertices),
    normals: new Float32Array(tri.normals),
    colors: new Float32Array(tri.colors),
    texCoords: new Float32Array(tri.texCoords),
    heights: new Float32Array(tri.heights),
    pickingColors: new Float32Array(tri.pickingColors)
  };

  postMessage(res, [
    res.vertices.buffer,
    res.normals.buffer,
    res.colors.buffer,
    res.texCoords.buffer,
    res.heights.buffer,
    res.pickingColors.buffer
  ]);
}