function objectToString(value) {
      if (value === null) return 'null';
      if (typeof value.valueOf === 'function') {
        value = value.valueOf();
        if (isPrimitive(value)) return value;
      }
      if (typeof value.toString === 'function') {
        value = value.toString();
        if (isPrimitive(value)) return value;
      }
      return '';
    }