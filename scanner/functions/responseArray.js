function responseArray(handler) {
    var response = handler;

    if (Object.prototype.toString.call(handler) != "[object Array]") {
      response = [200, {}, handler];
    }

    if (typeof response[2] != "string") {
      throw new TypeError("Fake server response body should be string, but was " + typeof response[2]);
    }

    return response;
  }