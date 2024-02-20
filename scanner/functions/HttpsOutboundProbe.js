function HttpsOutboundProbe() {
  Probe.call(this, 'https'); // match the name of the module we're instrumenting
}