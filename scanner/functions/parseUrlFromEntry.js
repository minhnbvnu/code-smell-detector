function parseUrlFromEntry(entry) {
  var parts =
    entry.indexOf(":") > 0 ? entry.substr(entry.indexOf(":") + 1) : entry;
  parts = parts.split(/\//).reverse();
  for (var i in parts) {
    var part = parts[i];
    var info = Tldjs.parse(part);
    if (
      info.isValid &&
      info.tldExists &&
      info.domain !== null &&
      info.hostname === part
    ) {
      return part;
    }
  }
  return "";
}