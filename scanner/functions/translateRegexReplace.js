function translateRegexReplace(str) {
      var escapeNextChar = false;
      var out = [];
      for (var i = -1; i < str.length; i++) {
        var c = str.charAt(i) || '';
        var n = str.charAt(i+1) || '';
        if (charUnescapes[c + n]) {
          out.push(charUnescapes[c+n]);
          i++;
        } else if (escapeNextChar) {
          // At any point in the loop, escapeNextChar is true if the previous
          // character was a '\' and was not escaped.
          out.push(c);
          escapeNextChar = false;
        } else {
          if (c === '\\') {
            escapeNextChar = true;
            if ((isNumber(n) || n === '$')) {
              out.push('$');
            } else if (n !== '/' && n !== '\\') {
              out.push('\\');
            }
          } else {
            if (c === '$') {
              out.push('$');
            }
            out.push(c);
            if (n === '/') {
              out.push('\\');
            }
          }
        }
      }
      return out.join('');
    }