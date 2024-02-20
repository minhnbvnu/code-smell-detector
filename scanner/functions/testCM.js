function testCM(name, run, opts, expectedFail) {
  return test(namespace + name, function() {
    var place = document.getElementById("testground"), cm = window.cm = CodeMirror(place, opts);
    var successful = false;
    try {
      run(cm);
      successful = true;
    } finally {
      if (!successful || verbose) {
        place.style.visibility = "visible";
      } else {
        place.removeChild(cm.getWrapperElement());
      }
    }
  }, expectedFail);
}