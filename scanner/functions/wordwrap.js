function wordwrap (str, width, cut, brk) {
  brk = brk || '\n';
  width = width || 75;
  cut = cut || false;

  if (!str) { return str; }

  var regex = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');

  return str.match(new RegExp(regex, 'g')).join(brk);
}