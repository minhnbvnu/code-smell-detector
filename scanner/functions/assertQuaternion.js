function assertQuaternion (quaternion, arr) {
  quaternion = quaternion.toArray();
  // Compute negative quaternion if necessary. Equivalent rotations.
  // eslint-disable-next-line eqeqeq
  if (quaternion[0].toFixed(5) * -1 == arr[0].toFixed(5)) {
    quaternion = quaternion.map(n => -1 * n);
  }
  // Round.
  quaternion = quaternion.map(n => n.toFixed(5));
  arr = arr.map(n => n.toFixed(5));

  assert.shallowDeepEqual(quaternion, arr);
}