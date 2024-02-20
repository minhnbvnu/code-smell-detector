function getScrewDriverBody() {

  const geometry = new THREE.CylinderBufferGeometry(1, 1, 3, 36, 50, false);

  const positions = geometry.attributes.position.array;
  for (let j = 0; j < positions.length; j += 3) {
    const x = positions[j + 0];
    const y = positions[j + 1];
    const z = positions[j + 2];
    const r = Math.sqrt(x * x + z * z);

    const a = Math.atan2(z, x);
    let r2 = Maf.smoothStep(0., 1., Maf.smoothMin(r - .1 + .2 * Math.sin(6 * a), r, 40.));

    if (y > 1.4) {
      r2 -= easings.InQuad(Maf.map(1.4, 1.5, 0, 1, y)) * .1;
    }
    if (y < -1.2) {
      r2 -= easings.InQuad(Maf.map(1.2, 1.5, 0, 1, Math.abs(y))) * .3;
    }

    if (y > .8 && y < 1.) {
      r2 -= easings.InOutQuad(Maf.map(.8, 1., 0, 1, y)) * .1;
    }
    if (y > 1. && y < 1.2) {
      r2 -= easings.InOutQuad(1. - Maf.map(1., 1.2, 0, 1, y)) * .1;
    }

    positions[j + 0] = r2 * Math.cos(a);
    positions[j + 2] = r2 * Math.sin(a);
  }
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Maf.PI / 2));
  return geometry;

}