function handleDisplay(stack, code, options) {
  code = parseInt(code, 10);
  var codeMap = {
    '-1': function _() {
      return '<br/>';
    },
    0: function _() {
      return stack.length && resetStyles(stack);
    },
    1: function _() {
      return pushTag(stack, 'b');
    },
    3: function _() {
      return pushTag(stack, 'i');
    },
    4: function _() {
      return pushTag(stack, 'u');
    },
    8: function _() {
      return pushStyle(stack, 'display:none');
    },
    9: function _() {
      return pushTag(stack, 'strike');
    },
    22: function _() {
      return pushStyle(stack, 'font-weight:normal;text-decoration:none;font-style:normal');
    },
    23: function _() {
      return closeTag(stack, 'i');
    },
    24: function _() {
      return closeTag(stack, 'u');
    },
    39: function _() {
      return pushForegroundColor(stack, options.fg);
    },
    49: function _() {
      return pushBackgroundColor(stack, options.bg);
    },
    53: function _() {
      return pushStyle(stack, 'text-decoration:overline');
    }
  };
  var result;

  if (codeMap[code]) {
    result = codeMap[code]();
  } else if (4 < code && code < 7) {
    result = pushTag(stack, 'blink');
  } else if (29 < code && code < 38) {
    result = pushForegroundColor(stack, options.colors[code - 30]);
  } else if (39 < code && code < 48) {
    result = pushBackgroundColor(stack, options.colors[code - 40]);
  } else if (89 < code && code < 98) {
    result = pushForegroundColor(stack, options.colors[8 + (code - 90)]);
  } else if (99 < code && code < 108) {
    result = pushBackgroundColor(stack, options.colors[8 + (code - 100)]);
  }

  return result;
}