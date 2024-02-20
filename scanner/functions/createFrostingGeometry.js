function createFrostingGeometry(outerRadius, innerRadius, seed) {

  const geometry = new THREE.PlaneBufferGeometry(1, 1, 25, 50);

  const base = new THREE.Vector3();
  const p = new THREE.Vector3();
  const m = new THREE.Matrix4();
  const spread = .5;

  const positions = geometry.attributes.position.array;
  for (let j = 0; j < positions.length; j += 3) {
    const x = positions[j + 0];
    const y = positions[j + 1];
    const z = positions[j + 2];
    const a = Maf.map(-.5, .5, 0, Maf.TAU, y);
    const r = outerRadius;
    base.set(Math.cos(a), Math.sin(a), 0).multiplyScalar(r);
    const a2 = Maf.map(.5, -.5, outerBorder(a, seed, spread), innerBorder(a, seed, spread), x);
    const s = 1.01 + .1 * (easings.InOutQuad(Maf.parabola(Maf.map(.5, -.5, 0, 1, x), .1)));
    p.set(Math.cos(a2), 0, Math.sin(a2)).multiplyScalar(s * innerRadius);
    m.makeRotationZ(a);
    p.applyMatrix4(m);
    p.add(base);
    positions[j + 0] = p.x;
    positions[j + 1] = p.y;
    positions[j + 2] = p.z;
  }
  geometry.computeVertexNormals();
  return geometry;
}