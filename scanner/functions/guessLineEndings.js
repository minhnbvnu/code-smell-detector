function guessLineEndings(input, quoteChar) {
      input = input.substr(0, 1024 * 1024);
      var re = new RegExp(escapeRegExp(quoteChar) + "([^]*?)" + escapeRegExp(quoteChar), "gm");
      input = input.replace(re, "");
      var r = input.split("\r");
      var n = input.split("\n");
      var nAppearsFirst = n.length > 1 && n[0].length < r[0].length;
      if (r.length === 1 || nAppearsFirst)
        return "\n";
      var numWithN = 0;
      for (var i = 0; i < r.length; i++) {
        if (r[i][0] === "\n")
          numWithN++;
      }
      return numWithN >= r.length / 2 ? "\r\n" : "\r";
    }