function unesc(str) {
  str = str.split('%~').join('?');
  str = str.split('%%').join('*');
  return str;
}