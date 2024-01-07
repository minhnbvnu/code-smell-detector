function writeDateTimeTextNode(node, dateTime) {
  const date = new Date(dateTime * 1000);
  const string =
    date.getUTCFullYear() +
    '-' +
    padNumber(date.getUTCMonth() + 1, 2) +
    '-' +
    padNumber(date.getUTCDate(), 2) +
    'T' +
    padNumber(date.getUTCHours(), 2) +
    ':' +
    padNumber(date.getUTCMinutes(), 2) +
    ':' +
    padNumber(date.getUTCSeconds(), 2) +
    'Z';
  node.appendChild(getDocument().createTextNode(string));
}