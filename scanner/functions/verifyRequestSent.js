function verifyRequestSent(xhr) {
    if (xhr.readyState == FakeXMLHttpRequest.DONE) {
      throw new Error("Request done");
    }
  }