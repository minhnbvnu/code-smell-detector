function __embind_register_void(rawType, name) {
          name = readLatin1String(name);
          registerType(rawType, { isVoid: true, name, "argPackAdvance": 0, "fromWireType": function() {
            return void 0;
          }, "toWireType": function(destructors, o) {
            return void 0;
          } });
        }