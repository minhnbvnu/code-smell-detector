function illegalChildOperation(operation) {
      throw new Error(operation + " is not currently supported on child containers");
    }