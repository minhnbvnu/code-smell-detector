function safeGetDescriptor(obj, prop) {
        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        if (descriptor && descriptor.configurable) {
          return descriptor;
        }
        return null;
      }