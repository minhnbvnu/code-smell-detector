function readToken(data, offset) {
        var token = "",
            ch = data[offset];

        while (ch !== LF && ch !== CR && ch !== LT) {
          if (++offset >= data.length) {
            break;
          }

          token += String.fromCharCode(ch);
          ch = data[offset];
        }

        return token;
      }