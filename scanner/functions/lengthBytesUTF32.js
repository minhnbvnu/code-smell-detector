function lengthBytesUTF32(str) {
          var len = 0;
          for (var i = 0; i < str.length; ++i) {
            var codeUnit = str.charCodeAt(i);
            if (codeUnit >= 55296 && codeUnit <= 57343)
              ++i;
            len += 4;
          }
          return len;
        }