function serializeProperty(key, holder) {
      var value = holder[key];

      if (value != null) {
        if (typeof value.toJSON5 === 'function') {
          value = value.toJSON5(key);
        } else if (typeof value.toJSON === 'function') {
          value = value.toJSON(key);
        }
      }

      if (replacerFunc) {
        value = replacerFunc.call(holder, key, value);
      }

      if (value instanceof Number) {
        value = Number(value);
      } else if (value instanceof String) {
        value = String(value);
      } else if (value instanceof Boolean) {
        value = value.valueOf();
      }

      switch (value) {
        case null:
          return 'null';

        case true:
          return 'true';

        case false:
          return 'false';
      }

      if (typeof value === 'string') {
        return quoteString(value, false);
      }

      if (typeof value === 'number') {
        return String(value);
      }

      if (typeof value === 'object') {
        return Array.isArray(value) ? serializeArray(value) : serializeObject(value);
      }

      return undefined;
    }