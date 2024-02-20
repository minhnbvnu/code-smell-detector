function encodeEscape(charCode) {
          if (charCode < 0x20) {
            return (charCode < 0x10 ? '\\x0' : '\\x') + charCode.toString(16);
          }
          var ch = String.fromCharCode(charCode);
          return (ch === '\\' || ch === '-' || ch === ']' || ch === '^')
            ? "\\" + ch : ch;
        }