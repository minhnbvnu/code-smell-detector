function toQuaternion (x, y, z) {
  var euler = new THREE.Euler();
  var quaternion = new THREE.Quaternion();
  return (function () {
    euler.fromArray([x, y, z]);
    quaternion.setFromEuler(euler);
    return quaternion.toArray();
  })();
}