function getOptionValuesKeys(optionValues) {
      var optionValuesKeys;

      if (!keyName && isArrayLike(optionValues)) {
        optionValuesKeys = optionValues;
      } else {
        // if object, extract keys, in enumeration order, unsorted
        optionValuesKeys = [];
        for (var itemKey in optionValues) {
          if (optionValues.hasOwnProperty(itemKey) && itemKey.charAt(0) !== '$') {
            optionValuesKeys.push(itemKey);
          }
        }
      }
      return optionValuesKeys;
    }