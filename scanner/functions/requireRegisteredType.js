function requireRegisteredType(rawType, humanName) {
          var impl = registeredTypes[rawType];
          if (impl === void 0) {
            throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
          }
          return impl;
        }