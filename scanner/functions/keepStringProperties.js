function keepStringProperties(properties, numericKeys) {
    const props = {};
    for (const key in properties) {
      if (!numericKeys.includes(key)) {
        props[key] = properties[key];
      }
    }
    return props;
  }