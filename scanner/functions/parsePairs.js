function parsePairs(val, vars) {
  /*
   * Key-value pairs, separated by equal signs
   * keys can only contain letters, numbers, and underscores
   * values can be any character
   */
  const group = val.match(/(^[a-zA-Z_][a-zA-Z\d_]*)=.*/);
  vars = vars || {};
  if (group) {
    vars[group[1]] = val.substring(val.indexOf('=') + 1); // fix: https://github.com/alibaba/funcraft/issues/1030
  }
  return vars;
}