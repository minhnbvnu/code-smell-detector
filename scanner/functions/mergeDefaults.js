function mergeDefaults(objectValue, sourceValue) {
      return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
    }