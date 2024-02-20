function uniqAssetName(name, names) {
  var uniqName = name;
  var num = 2;
  while (contains(names, uniqName)) {
    uniqName = name + '-' + num;
    num++;
  }
  return uniqName;
}