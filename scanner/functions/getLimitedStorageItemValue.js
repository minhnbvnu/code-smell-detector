function getLimitedStorageItemValue(value) {
        if (typeof value !== "string") {
          throw new Error("Invalid value");
        }
        var allowedStorageValues = new Set(["undefined", "false", "true", "null", "", "yes", "no", "on", "off"]);
        var validValue;
        if (allowedStorageValues.has(value.toLowerCase())) {
          validValue = value;
        } else if (value === "emptyArr") {
          validValue = "[]";
        } else if (value === "emptyObj") {
          validValue = "{}";
        } else if (/^\d+$/.test(value)) {
          validValue = parseFloat(value);
          if (nativeIsNaN(validValue)) {
            throw new Error("Invalid value");
          }
          if (Math.abs(validValue) > 32767) {
            throw new Error("Invalid value");
          }
        } else if (value === "$remove$") {
          validValue = "$remove$";
        } else {
          throw new Error("Invalid value");
        }
        return validValue;
      }