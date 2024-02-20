function inferValue(value) {
        if (value === "undefined") {
          return undefined;
        }
        if (value === "false") {
          return false;
        }
        if (value === "true") {
          return true;
        }
        if (value === "null") {
          return null;
        }
        if (value === "NaN") {
          return NaN;
        }
        var MAX_ALLOWED_NUM = 32767;
        var numVal = Number(value);
        if (!nativeIsNaN(numVal)) {
          if (Math.abs(numVal) > MAX_ALLOWED_NUM) {
            throw new Error("number values bigger than 32767 are not allowed");
          }
          return numVal;
        }
        var errorMessage = "'".concat(value, "' value type can't be inferred");
        try {
          var parsableVal = JSON.parse(value);
          if (parsableVal instanceof Object || typeof parsableVal === "string") {
            return parsableVal;
          }
        } catch (e) {
          errorMessage += ": ".concat(e);
        }
        throw new TypeError(errorMessage);
      }