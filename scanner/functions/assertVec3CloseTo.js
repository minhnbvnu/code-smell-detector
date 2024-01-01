function assertVec3CloseTo (vec3, arr, delta) {
  var debugOutput = `${[vec3.x, vec3.y, vec3.z]} is not close to ${arr}`;
  assert.closeTo(vec3.x, arr[0], delta, debugOutput);
  assert.closeTo(vec3.y, arr[1], delta, debugOutput);
  assert.closeTo(vec3.z, arr[2], delta, debugOutput);
}