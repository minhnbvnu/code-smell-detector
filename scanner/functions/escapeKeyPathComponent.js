function escapeKeyPathComponent(e) {
    return e.replaceAll("''", "''''").replace(/^$/, "''").replaceAll("~", "~0").replaceAll(".", "~1");
  }