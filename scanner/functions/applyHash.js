function applyHash() {
    var hash = location.hash.slice(1);

    // Remove pre-existing temporary lines
    $$('.temporary.line-highlight').forEach(function(line) {
      line.parentNode.removeChild(line);
    });

    var range = (hash.match(/\.([\d,-]+)$/) || [, ''])[1];

    if (!range || document.getElementById(hash)) {
      return;
    }

    var id = hash.slice(0, hash.lastIndexOf('.')),
      pre = document.getElementById(id);

    if (!pre) {
      return;
    }

    if (!pre.hasAttribute('data-line')) {
      pre.setAttribute('data-line', '');
    }

    highlightLines(pre, range, 'temporary ');

    document.querySelector('.temporary.line-highlight').scrollIntoView();
  }