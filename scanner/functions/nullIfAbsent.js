function nullIfAbsent(matchPart) {
  return ('string' == typeof matchPart) && (matchPart.length > 0)
         ? matchPart
         : null;
}