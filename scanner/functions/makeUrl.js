function makeUrl(s) {
  var search = window.location.search;

  // Remove previous grep query parameter if present
  if (search) {
    search = search.replace(/[?&]grep=[^&\s]*/g, '').replace(/^&/, '?');
  }

  return (
    window.location.pathname +
    (search ? search + '&' : '?') +
    'grep=' +
    encodeURIComponent(escapeRe(s))
  );
}