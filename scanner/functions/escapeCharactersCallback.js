function escapeCharactersCallback(wholeMatch, m1) {
  'use strict';
  var charCodeToEscape = m1.charCodeAt(0);
  return '~E' + charCodeToEscape + 'E';
}