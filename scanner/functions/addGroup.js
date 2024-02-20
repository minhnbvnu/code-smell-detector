function addGroup(num) {
  const objects = [];
  for (let i=0; i<num; i++) {
    const mesh = new THREE.Mesh(geometries[Math.floor(Math.random()*geometries.length)],material.clone());
    mesh.material.color = colors[Math.floor(Math.random()*colors.length)];
    mesh.position.set(Maf.randomInRange(-15,15),Maf.randomInRange(-15,15),Maf.randomInRange(-1,1));
    mesh.scale.setScalar(.9);
    mesh.castShadow = mesh.receiveShadow = true;
    objects.push({
      mesh,
      x:mesh.position.x,
      y:mesh.position.y,
      z:mesh.position.z,
      scale:.5+1.5*Math.random(),
      offset:Math.random(),
      speed: 1+Math.random(),
    });
    group.add(mesh);
  }
  return objects;
}