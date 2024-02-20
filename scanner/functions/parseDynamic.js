function parseDynamic(field, value) {
      if (shouldApplyDynamicTyping(field)) {
        if (value === "true" || value === "TRUE")
          return true;
        else if (value === "false" || value === "FALSE")
          return false;
        else if (FLOAT.test(value))
          return parseFloat(value);
        else if (ISO_DATE.test(value))
          return new Date(value);
        else
          return value === "" ? null : value;
      }
      return value;
    }