function parseSingleQuotedString(str) {
  return JSON.parse(`"${str.replace(/^'|'$/g, '').replace(/\\?"/g, '\\"')}"`);
}