function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}