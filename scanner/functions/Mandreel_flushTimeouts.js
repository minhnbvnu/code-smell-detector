function Mandreel_flushTimeouts() {
  while (Mandreel_timeouts.length != 0) {
    var next = Mandreel_timeouts.pop();
    eval(next);
  }
}