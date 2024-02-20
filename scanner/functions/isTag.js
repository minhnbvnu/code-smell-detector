function isTag(tok, tag) {
  return !tok ||
    !(tok.type === 'startTag' || tok.type === 'atomicTag') ||
    !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf(tag);
}