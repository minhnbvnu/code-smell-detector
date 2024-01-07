function constructRegex(searchTerm, makeRe, allowRegex) {
    try {
      if (allowRegex) {
        return makeRe(searchTerm);
      }
    } catch (e) {
    }
    // In case of invalid regexp fall back to non-regexp, but still allow . to match /
    return makeRe(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\./g, '[./]'));
  }