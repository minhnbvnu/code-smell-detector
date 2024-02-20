function readLatin1String(ptr) {
          var ret = "";
          var c = ptr;
          while (HEAPU8[c >>> 0]) {
            ret += embind_charCodes[HEAPU8[c++ >>> 0]];
          }
          return ret;
        }