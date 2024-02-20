function outsideClosure() {
      var key = 3;
      var insideFunction;
      for (var currentNumber = 0; currentNumber < 6; currentNumber++) {
        if (currentNumber === key) {
          //Although we match the key 3, the loop continues and the function will always
          //set the value to the last iteration of the loop
          insideFunction = function insideClosure() {
            return currentNumber;
          }
        }
      }
      return insideFunction;
    }