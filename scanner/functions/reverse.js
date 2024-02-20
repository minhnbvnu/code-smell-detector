function reverse(array) {
      return array == null ? array : nativeReverse.call(array);
    }