function mailTo(email, text, options) {
  if (typeof text === 'object') {
    options = text;
    text = null;
  }
  options = options || {};
  options.href = encodeURI('mailto:' + email);
  
  return tag('a', options, function() {
    return escape(text || email);
  });
}