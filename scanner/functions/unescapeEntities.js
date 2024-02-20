function unescapeEntities(s) {
    return s.replace(ENTITY_RE_1, decodeOneEntity);
  }