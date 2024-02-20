function __embind_register_emval(rawType, name) {
          name = readLatin1String(name);
          registerType(rawType, { name, "fromWireType": function(handle) {
            var rv = Emval.toValue(handle);
            __emval_decref(handle);
            return rv;
          }, "toWireType": function(destructors, value) {
            return Emval.toHandle(value);
          }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: null });
        }