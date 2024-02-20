function RTCStatsResponse(internalRTCStatsResponse) {
  this.result = function result() {
    return internalRTCStatsResponse.result();
  };
}