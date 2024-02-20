function loadStylesheetsFallingBack(stylesheets) {
    var n = stylesheets.length;
    function load(i) {
      if (i === n) { return; }
      var link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      if (i + 1 < n) {
        // http://pieisgood.org/test/script-link-events/ indicates that many
        // versions of IE do not support onerror on <link>s, though
        // http://msdn.microsoft.com/en-us/library/ie/ms535848(v=vs.85).aspx
        // indicates that recent IEs do support error.
        link.error = link.onerror = function () { load(i + 1); };
      }
      link.href = stylesheets[i];
      head.appendChild(link);
    }
    load(0);
  }