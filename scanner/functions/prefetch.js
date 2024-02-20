function prefetch(o) {
    return oParser({
      datumTokenizer: $.noop,
      queryTokenizer: $.noop,
      prefetch: _.mixin({
        url: '/example'
      }, o || {})
    });
  }