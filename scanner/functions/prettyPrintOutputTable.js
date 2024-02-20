function prettyPrintOutputTable(output, diffAt) {
    var s = '<table class="mt-output">';
    s += '<tr>';
    for (var i = 0; i < output.length; ++i) {
      var style = output[i].style, val = output[i].text;
      s +=
      '<td class="mt-token"' + (i == diffAt ? " style='background: pink'" : "") + '>' +
        '<span class="cm-' + esc(String(style)) + '">' +
        esc(val.replace(/ /g,'\xb7')) +  // · MIDDLE DOT
        '</span>' +
        '</td>';
    }
    s += '</tr><tr>';
    for (var i = 0; i < output.length; ++i) {
      s += '<td class="mt-style"><span>' + (output[i].style || null) + '</span></td>';
    }
    if(output[0].state) {
      s += '</tr><tr class="mt-state-row" title="State AFTER each token">';
      for (var i = 0; i < output.length; ++i) {
        s += '<td class="mt-state"><pre>' + esc(output[i].state) + '</pre></td>';
      }
    }
    s += '</tr></table>';
    return s;
  }