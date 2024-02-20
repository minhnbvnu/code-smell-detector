function FakeXMLHttpRequest() {
    this.readyState = FakeXMLHttpRequest.UNSENT;
    this.requestHeaders = {};
    this.requestBody = null;
    this.status = 0;
    this.statusText = "";

    if (typeof FakeXMLHttpRequest.onCreate == "function") {
      FakeXMLHttpRequest.onCreate(this);
    }
  }