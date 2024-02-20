function calcText(str) {
  if(str.length > 40) {
      return str.slice(0, 15) + '...' + (str.match(/([\/\\][^\/\\]+)$/) || ['', ''])[1];
  }
  return str;
}