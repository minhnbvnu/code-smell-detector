function getScrewDriverTip() {

  const geometry = new THREE.CylinderBufferGeometry(.2, .2, 3, 36, 50, false);

  const positions = geometry.attributes.position.array;
  for (let j = 0; j < positions.length; j += 3) {
    const x = positions[j + 0];
    const y = positions[j + 1];
    const z = positions[j + 2];
    const r = Math.sqrt(x * x + z * z);

    const a = Math.atan2(z, x);
    let r2 = r;
    if (y > .5) {
      const f = easings.InQuad(Maf.map(.5, 1.5, 0, 1, y));
      r2 = r - f * .8 * Maf.smoothStep(0., 1., 5. * Math.sin(4 * a)) * r;
    }
    if (y > 1.) {
      r2 *= easings.OutQuad(1. - Maf.map(1., 1.5, 0, 1, y));
    }


    positions[j + 0] = r2 * Math.cos(a);
    positions[j + 2] = r2 * Math.sin(a);
  }
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Maf.PI / 2));
  return geometry;

}