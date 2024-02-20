function HttpProbe() {
  Probe.call(this, 'http');
  this.config = {
    filters: [],
  };
}