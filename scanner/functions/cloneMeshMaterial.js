function cloneMeshMaterial (object3d) {
  object3d.traverse(function (node) {
    var newMaterial;
    if (node.type !== 'Mesh') return;
    newMaterial = node.material.clone();
    object3d.originalColor = node.material.color;
    node.material.dispose();
    node.material = newMaterial;
  });
}