function fillNumericProperties(object, properties, index, length) {
    for (const numericPropName in object.numericProps) {
      if (numericPropName in properties) {
        const value = properties[numericPropName];
        object.numericProps[numericPropName].fill(value, index, index + length);
      }
    }
  }