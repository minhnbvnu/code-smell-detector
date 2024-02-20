function integerReadValueFromPointer(name, shift, signed) {
          switch (shift) {
            case 0:
              return signed ? function readS8FromPointer(pointer) {
                return HEAP8[pointer >>> 0];
              } : function readU8FromPointer(pointer) {
                return HEAPU8[pointer >>> 0];
              };
            case 1:
              return signed ? function readS16FromPointer(pointer) {
                return HEAP16[pointer >>> 1];
              } : function readU16FromPointer(pointer) {
                return HEAPU16[pointer >>> 1];
              };
            case 2:
              return signed ? function readS32FromPointer(pointer) {
                return HEAP32[pointer >>> 2];
              } : function readU32FromPointer(pointer) {
                return HEAPU32[pointer >>> 2];
              };
            default:
              throw new TypeError("Unknown integer type: " + name);
          }
        }