function isValidDate(value) {
      // Invalid Date: getTime() returns NaN
      return value && !(value.getTime && value.getTime() !== value.getTime());
    }