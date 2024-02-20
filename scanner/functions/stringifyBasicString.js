function stringifyBasicString (str) {
  return '"' + escapeString(str).replace(/"/g, '\\"') + '"'
}