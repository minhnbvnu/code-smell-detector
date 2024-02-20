function stripQueryString(url) {
    return url.replace(QUERY_STRING_PATTERN, "");
  }