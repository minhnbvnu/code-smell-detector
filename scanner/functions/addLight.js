function addLight(pos, dir, col) {
  const cone = new THREE.Mesh(coneGeometry, coneMaterial.clone());
  cone.material.uniforms.color.value.copy(col);
  cone.position.copy(pos);
  cone.scale.set(2, 2, 3);
  cone.lookAt(pos.add(dir));
  return cone;
}