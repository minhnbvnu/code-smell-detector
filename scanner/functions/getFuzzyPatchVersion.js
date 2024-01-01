function getFuzzyPatchVersion (version) {
  var split = version.split('.');
  split[2] = 'x';
  return split.join('.');
}