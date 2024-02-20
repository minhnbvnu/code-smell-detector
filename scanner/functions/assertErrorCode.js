function assertErrorCode(cb, c) {
  var e = expectError(cb);
  if(e.code !== c) {
    throw e;
  }
  return true;
}