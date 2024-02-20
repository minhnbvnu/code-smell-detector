function HttpsProbe() {
  Probe.call(this, 'https');
  this.config = {
    filters: [],
  };
}