function fragment(html) {
  var args = arguments;
  var div = document.createElement('div');
  var i = 1;

  div.innerHTML = html.replace(/%([se])/g, function(_, type) {
    switch (type) {
      case 's':
        return String(args[i++]);
      case 'e':
        return escape(args[i++]);
      // no default
    }
  });

  return div.firstChild;
}