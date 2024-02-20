function getCompareFn() {
      if (isFunction(inputOptions.compare)) {
        return inputOptions.compare;
      }
      return (value, other) => {
        /* istanbul ignore else */
        if (__DEV__) {
          if (isRaw && ![value, other].every(testIsEqualCompatibility)) {
            warn(
              `missingCompare.${key}`,
              `You used a raw input type for "${name}" without providing a ` +
                'custom compare method. As a result, the pristine value of ' +
                'this input will be calculated using strict equality check ' +
                '(====), which is insufficient. Please provide a custom ' +
                'compare method for this input in order to get an accurate ' +
                'pristine value.',
            );
          }
        }
        return isEqual(value, other);
      };
    }