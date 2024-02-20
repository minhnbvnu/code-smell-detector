function extract_names(param) {
    return extract_identifiers(param).map((node2) => node2.name);
  }