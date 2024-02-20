function getTileSizeOnScreen(tileX, tileY, tileZoom, viewProjMatrix) {
  const tileLon = tile2lon(tileX, tileZoom);
  const tileLat = tile2lat(tileY, tileZoom);
  
  const modelMatrix = new GLX.Matrix();
  modelMatrix.translateBy(
    (tileLon - APP.position.longitude) * METERS_PER_DEGREE_LONGITUDE,
    (APP.position.latitude - tileLat) * METERS_PER_DEGREE_LATITUDE,
    0
  );

  const size = getTileSizeInMeters( APP.position.latitude, tileZoom);
  
  const mvpMatrix = GLX.Matrix.multiply(modelMatrix, viewProjMatrix);
  const tl = transformVec3(mvpMatrix, [0   , 0   , 0]);
  const tr = transformVec3(mvpMatrix, [size, 0   , 0]);
  const bl = transformVec3(mvpMatrix, [0   , size, 0]);
  const br = transformVec3(mvpMatrix, [size, size, 0]);
  const res = [tl, tr, bl, br].map(vert => {
    // transformation from NDC [-1..1] to viewport [0.. width/height] coordinates
    vert[0] = (vert[0] + 1.0) / 2.0 * APP.width;
    vert[1] = (vert[1] + 1.0) / 2.0 * APP.height;
    return vert;
  });
  
  return getConvexQuadArea(res);
}