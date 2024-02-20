function backtickify(str) {
  var escaped = '`' + str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/{/g, '\\{') + '`';
  // Replace require( with require\( so node-haste doesn't replace example
  // require calls in the docs
  return escaped.replace(/require\(/g, 'require\\(');
}