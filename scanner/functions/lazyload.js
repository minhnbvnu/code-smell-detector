function lazyload(opts) {
  opts = merge({
    'offset': 333,
    'src': 'data-src',
    'container': false
  }, opts || {});

  if (typeof opts.src === 'string') {
    registerLazyAttr(opts.src);
  }

  var elts = [];

  function show(elt) {
    var src = findRealSrc(elt);

    if (src) {
      elt.src = src;
    }

    elt.setAttribute('data-lzled', true);
    elts[indexOf.call(elts, elt)] = null;
  }

  function findRealSrc(elt) {
    if (typeof opts.src === 'function') {
      return opts.src(elt);
    }

    return elt.getAttribute(opts.src);
  }

  function register(elt) {
    // unsubscribe onload
    // needed by IE < 9, otherwise we get another onload when changing the src
    elt.onload = null;
    elt.removeAttribute('onload');

    // https://github.com/vvo/lazyload/issues/62
    elt.onerror = null;
    elt.removeAttribute('onerror');

    if (indexOf.call(elts, elt) === -1) {
      inViewport(elt, opts, show);
    }
  }

  return register;
}