function escapeToken(value) {
    // eslint-disable-next-line no-useless-escape
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }