function generateParticles(from, to) {
  const instancedGeometry = new InstancedGeometry(geometry, { size: POINTS, colors: true });
  const instancedMesh = new THREE.Mesh(instancedGeometry.geometry, material);
  instancedMesh.frustumCulled = false;

  const posValues = instancedGeometry.positions.values;
  const quatValues = instancedGeometry.quaternions.values;
  const scaleValues = instancedGeometry.scales.values;

  for (let ptr = 0; ptr < POINTS; ptr++) {
    const x = Maf.randomInRange(-r, r);
    const y = Maf.randomInRange(-r, r);
    const z = Maf.randomInRange(from, to);
    posValues[ptr * 3] = x;
    posValues[ptr * 3 + 1] = y;
    posValues[ptr * 3 + 2] = z;
    scaleValues[ptr * 3] = 1;
    scaleValues[ptr * 3 + 1] = 1;
    scaleValues[ptr * 3 + 2] = 1;
    quatValues[ptr * 4] = 0;
    quatValues[ptr * 4 + 1] = 0;
    quatValues[ptr * 4 + 2] = 0;
    quatValues[ptr * 4 + 3] = 1;
  }

  instancedGeometry.update(POINTS);

  return { instancedMesh, instancedGeometry };
}