function stringify(value) {
      if (value == null) { // null || undefined
        return '';
      }
      switch (typeof value) {
        case 'string':
          break;
        case 'number':
          value = '' + value;
          break;
        default:
          value = toJson(value);
      }

      return value;
    }