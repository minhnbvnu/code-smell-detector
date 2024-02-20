function isObjTypeProto(type) {
      // Check whether the found type has objType in its hierarchy
      while (type && type != objType) {
        // Ff property is overriden higher in the hierarchy, return false
        if (type.props[name] || type.maybeProps && type.maybeProps[name]) {
          return false;
        }

        type = type.proto;
      }

      return type;
    }