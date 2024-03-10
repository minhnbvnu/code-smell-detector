  return Object.entries(condition).every(([keyword, value]) => {
    // console.log('KEYWORD', keyword, value, propertyValue);
    switch (keyword) {
      case 'const':
        if (Array.isArray(propertyValue) && value) {
          return propertyValue.sort().toString() == value.sort().toString();
        } else {
          return propertyValue === value;
        }
      case 'minimum':
        return propertyValue >= value;
      case 'exclusiveMinimum':
        return propertyValue > value;
      case 'maximum':
        return propertyValue <= value;
      case 'exclusiveMaximum':
        return propertyValue < value;
      case 'enum':
        if (Array.isArray(value) && !Array.isArray(propertyValue)) {
          return value.includes(propertyValue);
        }
        if (Array.isArray(value) && Array.isArray(propertyValue)) {
          return propertyValue.every(a => value.includes(a));
        }
        return false;
      case 'oneOf':
        if (Array.isArray(value) && !Array.isArray(propertyValue)) {
          return value.includes(propertyValue);
        }
        if (Array.isArray(value) && Array.isArray(propertyValue)) {
          return value.find(a => propertyValue.includes(a));
        }
        return false;
      case 'pattern':
        return new RegExp(value).test(propertyValue);
      // case 'properties':
      //   // eslint-disable-next-line no-use-before-define
      //   return checkProperties(value, values, propertyPath);
      case 'not':
        if (typeof value === 'object' && value.enum) {
          if (Array.isArray(value.enum) && !Array.isArray(propertyValue)) {
            return !value.enum.includes(propertyValue);
          }
          if (Array.isArray(value.enum) && Array.isArray(propertyValue)) {
            return !propertyValue.every(a => value.enum.includes(a));
          }
        }
        return propertyValue !== value;
      default:
        // not supported keywords return false
        return false;
    }
  });