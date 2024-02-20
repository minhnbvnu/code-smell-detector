function setShadows(mesh, { castShadow, receiveShadow }) {
  mesh.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = castShadow;
      child.receiveShadow = receiveShadow;
    }
  });

  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
}