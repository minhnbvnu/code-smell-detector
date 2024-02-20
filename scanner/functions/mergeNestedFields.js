function mergeNestedFields(mergedOptions, options) {
    for (const key in options) {
      if (key in options) {
        const value = options[key];
        if (isPureObject(value) && isPureObject(mergedOptions[key])) {
          mergedOptions[key] = {
            ...mergedOptions[key],
            ...options[key]
          };
        } else {
          mergedOptions[key] = options[key];
        }
      }
    }
  }