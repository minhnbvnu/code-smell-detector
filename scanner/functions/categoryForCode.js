function categoryForCode(code) {
  code = parseInt(code, 10);
  var result = null;

  if (code === 0) {
    result = 'all';
  } else if (code === 1) {
    result = 'bold';
  } else if (2 < code && code < 5) {
    result = 'underline';
  } else if (4 < code && code < 7) {
    result = 'blink';
  } else if (code === 8) {
    result = 'hide';
  } else if (code === 9) {
    result = 'strike';
  } else if (29 < code && code < 38 || code === 39 || 89 < code && code < 98) {
    result = 'foreground-color';
  } else if (39 < code && code < 48 || code === 49 || 99 < code && code < 108) {
    result = 'background-color';
  }

  return result;
}