function extractIANAZone(match, cursor) {
    var zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
    return [{}, zone, cursor + 1];
  }