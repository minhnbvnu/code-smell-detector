function eltLoaded(id, lazyAttr) {
  lazyAttr = lazyAttr || defaultAttr;

  return function(done) {
    var elt = document.getElementById(id);
    setTimeout(function() {
      assert(elt.getAttribute('data-lzled') === 'true');
      done();
    }, 40);
  };
}