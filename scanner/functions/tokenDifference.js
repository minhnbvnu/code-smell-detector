function tokenDifference(str1, str2) {
  var values = '',
      tokens1 = str1.split(/\s+/),
      tokens2 = str2.split(/\s+/);

  outer:
  for (var i = 0; i < tokens1.length; i++) {
    var token = tokens1[i];
    for (var j = 0; j < tokens2.length; j++) {
      if (token == tokens2[j]) continue outer;
    }
    values += (values.length > 0 ? ' ' : '') + token;
  }
  return values;
}