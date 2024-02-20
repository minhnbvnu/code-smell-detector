function arrayContainsElement(array, element) {
      var iterator;
      var result = false;

      for (iterator = 0; iterator < array.length; iterator += 1) {
        if (array[iterator] === element) {
          result = true;
        }
      }
      return result;
    }