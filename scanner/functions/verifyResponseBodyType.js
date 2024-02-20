function verifyResponseBodyType(body) {
    if (typeof body != "string") {
      var error = new Error("Attempted to respond to fake XMLHttpRequest with " +
        body + ", which is not a string.");
      error.name = "InvalidBodyException";
      throw error;
    }
  }