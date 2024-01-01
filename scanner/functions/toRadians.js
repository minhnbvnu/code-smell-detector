function toRadians (obj) {
  obj.x = THREE.MathUtils.degToRad(obj.x);
  obj.y = THREE.MathUtils.degToRad(obj.y);
  obj.z = THREE.MathUtils.degToRad(obj.z);
}