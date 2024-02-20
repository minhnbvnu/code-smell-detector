function validateVersion(t, result, major, minor, patch) {
  t.equal(result.major, major, `major is ${major}`);
  t.equal(result.minor, minor, `minor is ${minor}`);
  t.equal(result.patch, patch, `patch is ${patch}`);
}