function getScriptURL() {
    var scripts = document.getElementsByTagName('script');
    if (scripts && scripts.length) {
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.match(/load_inspector.js$/)) {
          return scripts[i].src.replace(/\/load_inspector.js$/, '');
        }
      }
    }
    return null;
  }