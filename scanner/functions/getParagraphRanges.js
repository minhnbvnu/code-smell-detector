function getParagraphRanges(p) {
  var segments = [];
  var currRange;
  var prev, curr, c;
  for (var i=0, n=p.characters.length; i<n; i++) {
    c = p.characters[i];
    curr = getCharStyle(c);
    if (!prev || objectDiff(curr, prev)) {
      currRange = {
        text: '',
        aiStyle: curr
      };
      segments.push(currRange);
    }
    if (curr.warning) {
      currRange.warning = curr.warning;
    }
    currRange.text += c.contents;
    prev = curr;
  }
  return segments;
}