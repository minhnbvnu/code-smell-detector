function copy (value) {
        if (isPureObject(value)) {
          return utils.extendDeep({}, value);
        }
        return value;
      }