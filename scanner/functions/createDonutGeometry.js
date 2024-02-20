function createDonutGeometry(outerRadius, innerRadius, seed) {
  const geometry = new THREE.TorusBufferGeometry(outerRadius, innerRadius, 36, 50);
  return geometry;
}