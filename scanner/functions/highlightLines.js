function highlightLines(pre, lines, classes) {
    lines = typeof lines === 'string' ? lines : pre.getAttribute('data-line');

    var ranges = lines.replace(/\s+/g, '').split(','),
      offset = +pre.getAttribute('data-line-offset') || 0;

    var parseMethod = isLineHeightRounded() ? parseInt : parseFloat;
    var lineHeight = parseMethod(getComputedStyle(pre).lineHeight);
    var hasLineNumbers = hasClass(pre, 'line-numbers');

    for (var i = 0, currentRange; (currentRange = ranges[i++]); ) {
      var range = currentRange.split('-');

      var start = +range[0],
        end = +range[1] || start;

      var line =
        pre.querySelector(
          '.line-highlight[data-range="' + currentRange + '"]'
        ) || document.createElement('div');

      line.setAttribute('aria-hidden', 'true');
      line.setAttribute('data-range', currentRange);
      line.className = (classes || '') + 'line-highlight';

      //if the line-numbers plugin is enabled, then there is no reason for this plugin to display the line numbers
      if (hasLineNumbers && Prism.plugins.lineNumbers) {
        var startNode = Prism.plugins.lineNumbers.getLine(pre, start);
        var endNode = Prism.plugins.lineNumbers.getLine(pre, end);

        if (startNode) {
          line.style.top = startNode.offsetTop + 'px';
        }

        if (endNode) {
          line.style.height =
            endNode.offsetTop -
            startNode.offsetTop +
            endNode.offsetHeight +
            'px';
        }
      } else {
        line.setAttribute('data-start', start);

        if (end > start) {
          line.setAttribute('data-end', end);
        }

        line.style.top = (start - offset - 1) * lineHeight + 'px';

        line.textContent = new Array(end - start + 2).join(' \n');
      }

      //allow this to play nicely with the line-numbers plugin
      if (hasLineNumbers) {
        //need to attack to pre as when line-numbers is enabled, the code tag is relatively which screws up the positioning
        pre.appendChild(line);
      } else {
        (pre.querySelector('code') || pre).appendChild(line);
      }
    }
  }