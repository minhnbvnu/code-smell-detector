function downcastPointer(ptr, ptrClass, desiredClass) {
          if (ptrClass === desiredClass) {
            return ptr;
          }
          if (desiredClass.baseClass === void 0) {
            return null;
          }
          var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
          if (rv === null) {
            return null;
          }
          return desiredClass.downcast(rv);
        }