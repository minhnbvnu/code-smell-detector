function extend (base, extension) {
        if (isUndefined(base)) {
          return copy(extension);
        }
        if (isUndefined(extension)) {
          return copy(base);
        }
        if (isPureObject(base) && isPureObject(extension)) {
          return utils.extendDeep(base, extension);
        }
        return copy(extension);
      }