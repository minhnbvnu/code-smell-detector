function boosh(s, r, els) {
                          // string || node || nodelist || window
    if (ender._select && (typeof s == 'string' || s.nodeName || s.length && 'item' in s || s == window)) {
      els = ender._select(s, r);
      els.selector = s;
    } else {
      els = isFinite(s.length) ? s : [s];
    }
    return aug(els, boosh);
  }