function eqCursorPos(a, b, msg) {
  eqCharPos(a, b, msg);
  if (a) eq(a.sticky, b.sticky, msg ? msg + ' (sticky)' : 'sticky');
}