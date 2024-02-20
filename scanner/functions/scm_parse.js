function scm_parse(string) {
    var i;
    var result = [[]];
    var tokenbuf = [];
    function flush_tokenbuf() {
      if (tokenbuf.length > 0) {
        result[result.length-1].push(tokenbuf.join(""));
        tokenbuf = [];
      }
    }
    for (i = 0; i < string.length; i += 1) {
      var c = string[i];
      if (c == '(') {
        result.push([]);
      } else if (c == ')') {
        flush_tokenbuf();
        var newcom = result.splice(result.length-1)[0];
        result[result.length-1].push(newcom);
      } else if (c == ' ') {
        flush_tokenbuf();
      } else {
        tokenbuf.push(c);
      }
    }
    flush_tokenbuf();
    return result[0];
  }