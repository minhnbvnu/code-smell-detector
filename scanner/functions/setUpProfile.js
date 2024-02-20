function setUpProfile() {
  if (__DEV__) {
    var Systrace = require('Systrace');
    Systrace.swizzleReactPerf();
  }
}