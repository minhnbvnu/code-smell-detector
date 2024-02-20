function wildcardToRegExp(s) {
  return new RegExp('^' + s.split(/\*+/).map(regExpEscape).join('.*') + '$');
}