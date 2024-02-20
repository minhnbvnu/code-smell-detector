function __embind_register_enum(rawType, name, size, isSigned) {
          var shift = getShiftFromSize(size);
          name = readLatin1String(name);
          function ctor() {
          }
          ctor.values = {};
          registerType(rawType, { name, constructor: ctor, "fromWireType": function(c) {
            return this.constructor.values[c];
          }, "toWireType": function(destructors, c) {
            return c.value;
          }, "argPackAdvance": 8, "readValueFromPointer": enumReadValueFromPointer(name, shift, isSigned), destructorFunction: null });
          exposePublicSymbol(name, ctor);
        }