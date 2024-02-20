function floatReadValueFromPointer(name, shift) {
          switch (shift) {
            case 2:
              return function(pointer) {
                return this["fromWireType"](HEAPF32[pointer >>> 2]);
              };
            case 3:
              return function(pointer) {
                return this["fromWireType"](HEAPF64[pointer >>> 3]);
              };
            default:
              throw new TypeError("Unknown float type: " + name);
          }
        }