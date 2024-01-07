function faceToFeature(face) {
  const coordinates = topo.getFaceGeometry(face);
  const feature = new Feature({
    geometry: new Polygon(coordinates),
    face: face,
  });
  feature.setId(face.id);
  faces.addFeature(feature);
}