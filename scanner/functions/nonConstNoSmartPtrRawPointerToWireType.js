function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
          if (handle === null) {
            if (this.isReference) {
              throwBindingError("null is not a valid " + this.name);
            }
            return 0;
          }
          if (!handle.$$) {
            throwBindingError('Cannot pass "' + embindRepr(handle) + '" as a ' + this.name);
          }
          if (!handle.$$.ptr) {
            throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
          }
          if (handle.$$.ptrType.isConst) {
            throwBindingError("Cannot convert argument of type " + handle.$$.ptrType.name + " to parameter type " + this.name);
          }
          var handleClass = handle.$$.ptrType.registeredClass;
          var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
          return ptr;
        }