function getStyleKey(s) {
  var key = '';
  for (var i=0, n=cssTextStyleProperties.length; i<n; i++) {
    key += '~' + (s[cssTextStyleProperties[i]] || '');
  }
  return key;
}