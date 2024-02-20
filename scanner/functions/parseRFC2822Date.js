function parseRFC2822Date(s) {
    return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
  }