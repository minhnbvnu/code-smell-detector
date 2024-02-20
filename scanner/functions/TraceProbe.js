function TraceProbe() {
  Probe.call(this, 'trace');
  this.config = {
    includeModules: [],
    excludeModules: [],
  };
}