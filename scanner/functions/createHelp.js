function createHelp(helpText) {
    var text = helpText.split('\n');
    var lines = text.map(function (l) {
      return linkMarkdown2Html(l).trim();
    });

    var htmlString = [
      '<div style="display: none;">',
          '<div id="help-content">',
            getSketchName(),
            lines.join('\n'),
            '\n',
          '</div>',
      ' </div>',
    ].join('\n');

    document.title = getSketchName();
    $('body').append($.parseHTML(htmlString));
    $('#help').tooltipster({
      theme: 'tooltipster-noir',
      animation: 'fade',
      animationDuration: 100,
      distance: '10',
      trigger: 'click',
      interactive: true
    });
  }