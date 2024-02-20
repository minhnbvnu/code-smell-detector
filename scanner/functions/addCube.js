function addCube(x,y,z) {
  const mesh = new THREE.Mesh(geometry,material);
  mesh.position.set(x,y,z);
  mesh.castShadow = mesh.receiveShadow = true;
  const offset = (z+1)*9+(y+1)*3+(x+1);
  cubes.push({mesh,x,y,z,offset});
  group.add(mesh);
}