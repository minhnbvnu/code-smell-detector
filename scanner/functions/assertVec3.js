function assertVec3 (vec3, arr) {
  var debugOutput = `${[vec3.x, vec3.y, vec3.z]} does not equal ${arr}`;
  assert.equal(vec3.x, arr[0], debugOutput);
  assert.equal(vec3.y, arr[1], debugOutput);
  assert.equal(vec3.z, arr[2], debugOutput);
}