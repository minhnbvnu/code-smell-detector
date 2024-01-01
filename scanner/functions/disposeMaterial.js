function disposeMaterial (material, system) {
  material.dispose();
  system.unregisterMaterial(material);
}