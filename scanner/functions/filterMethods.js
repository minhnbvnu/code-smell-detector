function filterMethods(method) {
  return method.name[0] !== '_' && methodsBlacklist.indexOf(method.name) === -1;
}