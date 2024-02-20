function testDoc(name, spec, run, opts, expectFail) {
    if (!opts) opts = {};

    return test("doc_" + name, function() {
      var place = document.getElementById("testground");
      var editors = instantiateSpec(spec, place, opts);
      var successful = false;

      try {
        run.apply(null, editors);
        successful = true;
      } finally {
        if (!successful || verbose) {
          place.style.visibility = "visible";
        } else {
          for (var i = 0; i < editors.length; ++i)
            if (editors[i] instanceof CodeMirror)
              place.removeChild(editors[i].getWrapperElement());
        }
      }
    }, expectFail);
  }