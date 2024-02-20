function throwsException(error, message) {
      if (typeof error == "string") {
        this.exception = new Error(message || "");
        this.exception.name = error;
      } else if (!error) {
        this.exception = new Error("Error");
      } else {
        this.exception = error;
      }

      return this;
    }