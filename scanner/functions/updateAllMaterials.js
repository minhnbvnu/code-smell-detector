function updateAllMaterials (sceneEl) {
  if (!sceneEl.hasLoaded) { return; }

  sceneEl.object3D.traverse(function (node) {
    if (node.material) {
      var materials = Array.isArray(node.material) ? node.material : [node.material];
      for (var i = 0; i < materials.length; i++) {
        materials[i].needsUpdate = true;
      }
    }
  });
}