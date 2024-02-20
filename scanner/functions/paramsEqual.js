function paramsEqual(a, b){
  return !Object.keys(a).some(function(k) {
    return a[k] != b[k];
  });
}