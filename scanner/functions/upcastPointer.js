function upcastPointer(ptr, ptrClass, desiredClass) {
          while (ptrClass !== desiredClass) {
            if (!ptrClass.upcast) {
              throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
            }
            ptr = ptrClass.upcast(ptr);
            ptrClass = ptrClass.baseClass;
          }
          return ptr;
        }