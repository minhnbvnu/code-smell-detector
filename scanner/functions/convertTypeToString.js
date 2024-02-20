function convertTypeToString(value) {
        if (typeof value === "undefined") {
          return "undefined";
        }
        if (typeof value === "object") {
          if (value === null) {
            return "null";
          }
          return objectToString(value);
        }
        return value.toString();
      }