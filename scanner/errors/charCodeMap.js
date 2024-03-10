function charCodeMap(code, shift) {
      // Letters
      if (code >= 65 && code <= 90) { // A-Z
        // Keys return ASCII for upcased letters.
        // Convert to downcase if shiftKey is not pressed.
        if (shift) {
          return code;
        }
        else {
          return code + 32;
        }
      }

      // Numbers and their shift-symbols
      else if (code >= 48 && code <= 57) { // 0-9
        if (shift) {
          switch (code) {
          case 49:
            return 33; // !
          case 50:
            return 64; // @
          case 51:
            return 35; // #
          case 52:
            return 36; // $
          case 53:
            return 37; // %
          case 54:
            return 94; // ^
          case 55:
            return 38; // &
          case 56:
            return 42; // *
          case 57:
            return 40; // (
          case 48:
            return 41; // )
          }
        }
      }

      // Symbols and their shift-symbols
      else {
        if (shift) {
          switch (code) {
          case 107:
            return 43; // +
          case 219:
            return 123; // {
          case 221:
            return 125; // }
          case 222:
            return 34; // "
          }
        } else {
          switch (code) {
          case 188:
            return 44; // ,
          case 109:
            return 45; // -
          case 190:
            return 46; // .
          case 191:
            return 47; // /
          case 192:
            return 96; // ~
          case 219:
            return 91; // [
          case 220:
            return 92; // \
          case 221:
            return 93; // ]
          case 222:
            return 39; // '
          }
        }
      }
      return code;
    }