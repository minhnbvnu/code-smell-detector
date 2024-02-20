function verifyHeadersReceived(xhr) {
    if (xhr.async && xhr.readyState != FakeXMLHttpRequest.HEADERS_RECEIVED) {
      throw new Error("No headers received");
    }
  }