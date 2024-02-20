function getTableHeader(table) {
    for (const key in table) {
      for (const title in table[key]) {
        return title || "untitled";
      }
    }
    return "empty";
  }