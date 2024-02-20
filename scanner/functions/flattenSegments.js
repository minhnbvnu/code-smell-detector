function flattenSegments (segments) {
  var mergedSegments = [];
  var textBuffer = '';

  var pushBuffer = function () {
    if (textBuffer) {
      mergedSegments.push(JSON.stringify(textBuffer));
      textBuffer = '';
    }
  };

  for (var i = 0; i < segments.length; i++) {
    var s = segments[i];
    if (s.type === RAW) {
      textBuffer += s.value;
    } else if (s.type === INTERPOLATION) {
      pushBuffer();
      mergedSegments.push(("_ssrEscape(" + (s.value) + ")"));
    } else if (s.type === EXPRESSION) {
      pushBuffer();
      mergedSegments.push(("(" + (s.value) + ")"));
    }
  }
  pushBuffer();

  return mergedSegments.join('+')
}