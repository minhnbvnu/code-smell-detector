function addUsingGlobalVariable(localNumberOne) {
      //localNumberOne is a Local Variable and could only be accessed from the function's scope
      return globalVariable + localNumberOne; //Local and global variables can interact with each other
    }