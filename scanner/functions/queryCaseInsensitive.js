function queryCaseInsensitive(query) {
    return typeof query == "string" && query == query.toLowerCase();
  }