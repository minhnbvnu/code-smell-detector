function RequestBuilder(options) {
  this._sendTelemetry =
    options._sendTelemetry === false ? options._sendTelemetry : true;
  this._telemetryInfo = options._telemetryInfo || null;
  this._timesToRetryFailedRequests = options._timesToRetryFailedRequests;
  this.headers = options.headers || {};
  this._universalLoginPage = options.universalLoginPage;
}