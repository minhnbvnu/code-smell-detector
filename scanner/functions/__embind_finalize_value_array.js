function __embind_finalize_value_array(rawTupleType) {
          var reg = tupleRegistrations[rawTupleType];
          delete tupleRegistrations[rawTupleType];
          var elements = reg.elements;
          var elementsLength = elements.length;
          var elementTypes = elements.map(function(elt) {
            return elt.getterReturnType;
          }).concat(elements.map(function(elt) {
            return elt.setterArgumentType;
          }));
          var rawConstructor = reg.rawConstructor;
          var rawDestructor = reg.rawDestructor;
          whenDependentTypesAreResolved([rawTupleType], elementTypes, function(elementTypes2) {
            elements.forEach((elt, i) => {
              var getterReturnType = elementTypes2[i];
              var getter = elt.getter;
              var getterContext = elt.getterContext;
              var setterArgumentType = elementTypes2[i + elementsLength];
              var setter = elt.setter;
              var setterContext = elt.setterContext;
              elt.read = (ptr) => {
                return getterReturnType["fromWireType"](getter(getterContext, ptr));
              };
              elt.write = (ptr, o) => {
                var destructors = [];
                setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, o));
                runDestructors(destructors);
              };
            });
            return [{ name: reg.name, "fromWireType": function(ptr) {
              var rv = new Array(elementsLength);
              for (var i = 0; i < elementsLength; ++i) {
                rv[i] = elements[i].read(ptr);
              }
              rawDestructor(ptr);
              return rv;
            }, "toWireType": function(destructors, o) {
              if (elementsLength !== o.length) {
                throw new TypeError("Incorrect number of tuple elements for " + reg.name + ": expected=" + elementsLength + ", actual=" + o.length);
              }
              var ptr = rawConstructor();
              for (var i = 0; i < elementsLength; ++i) {
                elements[i].write(ptr, o[i]);
              }
              if (destructors !== null) {
                destructors.push(rawDestructor, ptr);
              }
              return ptr;
            }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: rawDestructor }];
          });
        }