function linkTo(url, text, options) {
  if (typeof text === 'object') {
    options = text;
    text = null;
  }
  if (typeof url !== 'string') {
    url = this.urlFor(url);
  }
  options = options || {};
  options.href = encodeURI(url);
  
  return tag('a', options, function() {
    return escape(text || url);
  });
}