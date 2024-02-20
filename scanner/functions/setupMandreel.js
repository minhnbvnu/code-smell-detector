function setupMandreel() {
  // Check for Typed Arrays support, throw error if not.
  if (!(typeof Uint8Array != "undefined" &&
    typeof Float64Array != "undefined" &&
    typeof (new Uint8Array(0)).subarray != "undefined")) {
      throw "TypedArrayUnsupported";
  }

  my_old_constructors = mandreel_call_constructors;
  mandreel_call_constructors = my_mandreel_call_constructors;
  startMandreelTimer();
  startApp();
  _mandreelAppAudioReady();
}