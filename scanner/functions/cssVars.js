function cssVars (color) {
  // Variable support
  if (window.CSS && window.CSS.supports && window.CSS.supports('(--v:red)')) {
    return
  }

  var styleBlocks = findAll('style:not(.inserted),link');
  [].forEach.call(styleBlocks, function (block) {
    if (block.nodeName === 'STYLE') {
      replaceVar(block, color);
    } else if (block.nodeName === 'LINK') {
      var href = block.getAttribute('href');

      if (!/\.css$/.test(href)) {
        return
      }

      get(href).then(function (res) {
        var style$$1 = create('style', res);

        head.appendChild(style$$1);
        replaceVar(style$$1, color);
      });
    }
  });
}