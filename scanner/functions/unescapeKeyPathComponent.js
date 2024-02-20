function unescapeKeyPathComponent(e) {
    return e.replaceAll("~1", ".").replaceAll("~0", "~").replace(/^''$/, "").replaceAll("''''", "''");
  }