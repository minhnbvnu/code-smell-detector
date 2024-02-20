function getLimitedCookieValue(value) {
        if (!value) {
          return null;
        }
        var allowedCookieValues = new Set(["true", "t", "false", "f", "yes", "y", "no", "n", "ok", "on", "off", "accept", "accepted", "notaccepted", "reject", "rejected", "allow", "allowed", "disallow", "deny", "enable", "enabled", "disable", "disabled", "necessary", "required"]);
        var validValue;
        if (allowedCookieValues.has(value.toLowerCase())) {
          validValue = value;
        } else if (/^\d+$/.test(value)) {
          validValue = parseFloat(value);
          if (nativeIsNaN(validValue)) {
            return null;
          }
          if (Math.abs(validValue) < 0 || Math.abs(validValue) > 15) {
            return null;
          }
        } else {
          return null;
        }
        return validValue;
      }