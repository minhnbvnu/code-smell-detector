function Universe() {
      try {
        return functionVariable();
      } catch (e) {
        return "NotLoaded";
      }
      var functionVariable = function functionResult() { //This function is never reached since it exists after the return statement
        return 5;
      }
    }