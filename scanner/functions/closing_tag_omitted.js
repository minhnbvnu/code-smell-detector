function closing_tag_omitted(current2, next) {
    if (disallowed_contents.has(current2)) {
      if (!next || disallowed_contents.get(current2).has(next)) {
        return true;
      }
    }
    return false;
  }