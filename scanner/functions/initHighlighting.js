function initHighlighting() {
    if (initHighlighting.called)
      return;
    initHighlighting.called = true;
    Array.prototype.map.call(document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'pre'), findCode).
      filter(Boolean).
      forEach(function(code){highlightBlock(code, hljs.tabReplace);});
  }