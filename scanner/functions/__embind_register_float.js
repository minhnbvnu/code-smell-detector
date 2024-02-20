function __embind_register_float(rawType, name, size) {
          var shift = getShiftFromSize(size);
          name = readLatin1String(name);
          registerType(rawType, { name, "fromWireType": function(value) {
            return value;
          }, "toWireType": function(destructors, value) {
            return value;
          }, "argPackAdvance": 8, "readValueFromPointer": floatReadValueFromPointer(name, shift), destructorFunction: null });
        }