function replaceGetAttribute(elementName) {
  var fullname = 'HTML' + elementName + 'Element';
  if (fullname in global === false) {
    return;
  }

  var original = global[fullname].prototype.getAttribute;
  global[fullname].prototype.getAttribute = function(name) {
    if (name === 'src') {
      var realSrc;
      for (var i = 0, max = lazyAttrs.length; i < max; i++) {
        realSrc = original.call(this, lazyAttrs[i]);
        if (realSrc) {
          break;
        }
      }

      return realSrc || original.call(this, name);
    }

    // our own lazyloader will go through theses lines
    // because we use getAttribute(opts.src)
    return original.call(this, name);
  };
}