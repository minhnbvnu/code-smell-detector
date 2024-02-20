function isEBADF(error) {
  return isExpectedError(error, -EBADF, 'EBADF');
}