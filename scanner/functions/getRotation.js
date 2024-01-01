function getRotation (entityEl) {
  var radToDeg = THREE.MathUtils.radToDeg;
  var rotation = entityEl.object3D.rotation;
  var rotationObj = entityEl.rotationObj;
  rotationObj.x = radToDeg(rotation.x);
  rotationObj.y = radToDeg(rotation.y);
  rotationObj.z = radToDeg(rotation.z);
  return rotationObj;
}