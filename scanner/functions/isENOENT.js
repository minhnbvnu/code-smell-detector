function isENOENT(error) {
  return isExpectedError(error, -ENOENT, 'ENOENT');
}