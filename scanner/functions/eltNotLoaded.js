function eltNotLoaded(id, lazyAttr) {
  lazyAttr = lazyAttr || defaultAttr;

  return function(done) {
    var elt = document.getElementById(id);
    setTimeout(function() {
      assert(elt['data-lzled'] === undefined);
      done();
    }, 25);
  }
}