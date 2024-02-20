function enumReadValueFromPointer(name, shift, signed) {
          switch (shift) {
            case 0:
              return function(pointer) {
                var heap = signed ? HEAP8 : HEAPU8;
                return this["fromWireType"](heap[pointer >>> 0]);
              };
            case 1:
              return function(pointer) {
                var heap = signed ? HEAP16 : HEAPU16;
                return this["fromWireType"](heap[pointer >>> 1]);
              };
            case 2:
              return function(pointer) {
                var heap = signed ? HEAP32 : HEAPU32;
                return this["fromWireType"](heap[pointer >>> 2]);
              };
            default:
              throw new TypeError("Unknown integer type: " + name);
          }
        }