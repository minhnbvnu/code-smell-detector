function remote(o) {
    return oParser({
      datumTokenizer: $.noop,
      queryTokenizer: $.noop,
      remote: _.mixin({
        url: '/example'
      }, o || {})
    });
  }