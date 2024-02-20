function difference(array) {
      return baseDifference(array, baseFlatten(arguments, true, true, 1));
    }