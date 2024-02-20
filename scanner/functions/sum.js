function sum(array) {
      return (array && array.length)
        ? baseSum(array, identity)
        : 0;
    }