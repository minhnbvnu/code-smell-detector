function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
          name = readLatin1String(name);
          var shift = getShiftFromSize(size);
          var fromWireType = (value) => value;
          if (minRange === 0) {
            var bitshift = 32 - 8 * size;
            fromWireType = (value) => value << bitshift >>> bitshift;
          }
          var isUnsignedType = name.includes("unsigned");
          var checkAssertions = (value, toTypeName) => {
          };
          var toWireType;
          if (isUnsignedType) {
            toWireType = function(destructors, value) {
              checkAssertions(value, this.name);
              return value >>> 0;
            };
          } else {
            toWireType = function(destructors, value) {
              checkAssertions(value, this.name);
              return value;
            };
          }
          registerType(primitiveType, { name, "fromWireType": fromWireType, "toWireType": toWireType, "argPackAdvance": 8, "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0), destructorFunction: null });
        }