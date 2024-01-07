function parseFloatOperand() {
        let str = "";
        const eof = 15;
        const lookup = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "E", "E-", null, "-"];
        const length = dict.length;

        while (pos < length) {
          const b = dict[pos++];
          const b1 = b >> 4;
          const b2 = b & 15;

          if (b1 === eof) {
            break;
          }

          str += lookup[b1];

          if (b2 === eof) {
            break;
          }

          str += lookup[b2];
        }

        return parseFloat(str);
      }