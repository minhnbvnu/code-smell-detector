function addGlow(pos, dir, col) {
  const glow = new THREE.Mesh(glowGeometry, glowMaterial.clone());
  glow.material.uniforms.color.value.copy(col);
  glow.position.copy(pos).multiplyScalar(.45);
  glow.lookAt(pos.add(dir));
  glow.scale.setScalar(18);
  return glow;
}