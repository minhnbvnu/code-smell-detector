function HttpOutboundProbe() {
  Probe.call(this, 'http'); // match the name of the module we're instrumenting
}