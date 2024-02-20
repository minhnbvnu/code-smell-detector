function stripTitle(str) {
  str = $('<div/>').html(str).text();
  str = str.replace(/(?:[\v]|[\b])/g, '');
  return str;
}