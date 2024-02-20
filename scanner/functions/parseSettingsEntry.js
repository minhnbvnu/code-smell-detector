function parseSettingsEntry(str) {
  var entryRxp = /^([\w-]+)\s*:\s*(.*)$/;
  var match = entryRxp.exec(trim(str));
  if (!match) return null;
  return [match[1], straightenCurlyQuotesInsideAngleBrackets(match[2])];
}