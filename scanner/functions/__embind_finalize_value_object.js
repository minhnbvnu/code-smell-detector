function __embind_finalize_value_object(structType) {
          var reg = structRegistrations[structType];
          delete structRegistrations[structType];
          var rawConstructor = reg.rawConstructor;
          var rawDestructor = reg.rawDestructor;
          var fieldRecords = reg.fields;
          var fieldTypes = fieldRecords.map((field) => field.getterReturnType).concat(fieldRecords.map((field) => field.setterArgumentType));
          whenDependentTypesAreResolved([structType], fieldTypes, (fieldTypes2) => {
            var fields = {};
            fieldRecords.forEach((field, i) => {
              var fieldName = field.fieldName;
              var getterReturnType = fieldTypes2[i];
              var getter = field.getter;
              var getterContext = field.getterContext;
              var setterArgumentType = fieldTypes2[i + fieldRecords.length];
              var setter = field.setter;
              var setterContext = field.setterContext;
              fields[fieldName] = { read: (ptr) => {
                return getterReturnType["fromWireType"](getter(getterContext, ptr));
              }, write: (ptr, o) => {
                var destructors = [];
                setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, o));
                runDestructors(destructors);
              } };
            });
            return [{ name: reg.name, "fromWireType": function(ptr) {
              var rv = {};
              for (var i in fields) {
                rv[i] = fields[i].read(ptr);
              }
              rawDestructor(ptr);
              return rv;
            }, "toWireType": function(destructors, o) {
              for (var fieldName in fields) {
                if (!(fieldName in o)) {
                  throw new TypeError('Missing field:  "' + fieldName + '"');
                }
              }
              var ptr = rawConstructor();
              for (fieldName in fields) {
                fields[fieldName].write(ptr, o[fieldName]);
              }
              if (destructors !== null) {
                destructors.push(rawDestructor, ptr);
              }
              return ptr;
            }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: rawDestructor }];
          });
        }