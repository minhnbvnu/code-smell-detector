function shouldWrapKey(str) {
  return str.indexOf('true') === 0 || str.indexOf('false') === 0 || /[:\s\n\\",\[\]]/g.test(str) || /^[0-9]/g.test(str) || !/^[a-zA-Z]/g.test(str);
}