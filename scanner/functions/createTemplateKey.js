function createTemplateKey(tpl) {
    var hash = 0,
      i, chr, len;
    if (tpl.length == 0) return tpl;
    for (i = 0, len = tpl.length; i < len; i++) {
      chr = tpl.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  }