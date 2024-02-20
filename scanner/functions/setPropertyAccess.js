function setPropertyAccess(object, property, descriptor) {
        var currentDescriptor = Object.getOwnPropertyDescriptor(object, property);
        if (currentDescriptor && !currentDescriptor.configurable) {
          return false;
        }
        Object.defineProperty(object, property, descriptor);
        return true;
      }