function sanitizeForParse(value) {
  if (typeof value === 'string') {
    if (value.length >= 2 && value.charAt(0) === "'" && value.charAt(value.length - 1) === "'") {
      return '"' + value.substr(1, value.length - 2) + '"';
    }
  }

  return value;
}