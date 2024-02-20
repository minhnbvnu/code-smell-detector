async function angleorient30() {
  return renderWorld(geoEquirectangular().clipAngle(90).angle(-30).precision(0.1).fitExtent([[0, 0], [width, height]], {type: "Sphere"}));
}