function nodeStrEscape(str) {
    return str.replace(/\\/g, "\\\\")
              .replace(/"/g, "\\\"")
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              .replace(/</g, "\\u003C")
              .replace(/>/g, "\\u003E");
}