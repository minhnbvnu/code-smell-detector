function store_json(cells, clipboard) {
  // Firefox ignores application/json mime type, so put it in HTML as well.
  // We also copy a text version so you can paste cell sources into a text editor
  var j = JSON.stringify(cells);
  var t = cells.map(function(c) {return c.source;}).join('\n\n');
  clipboard.setData('text/plain', t);
  clipboard.setData('text/html', jcbprefix + j + jcbsuffix);
  clipboard.setData('application/json', j);
}