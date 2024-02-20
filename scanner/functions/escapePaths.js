function escapePaths(str, arr, opts) {
  str = str.split('\/.').join('__ESC_PATH__');
  return map(braces(str, arr, opts), function(ele) {
    return ele.split('__ESC_PATH__').join('\/.');
  });
}