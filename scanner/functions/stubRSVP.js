function stubRSVP() {
  fakeRSVP = EmberObject.extend(Evented, {
    configure() {},
  }).create();
}