function simulateIE11() {
    document.documentMode = 11;
    window.CompositionEvent = {};
  }