function parseFloatOperand() {
        var str = '';
        var eof = 15;
        var lookup = ['0', '1', '2', '3', '4', '5', '6', '7', '8',
            '9', '.', 'E', 'E-', null, '-'];
        var length = dict.length;
        while (pos < length) {
          var b = dict[pos++];
          var b1 = b >> 4;
          var b2 = b & 15;

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