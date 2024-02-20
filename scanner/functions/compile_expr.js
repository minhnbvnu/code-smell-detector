function compile_expr(v) {
  v=v.replace(/'/g,"\\'");
  v=v.replace(/[\r\n]/g," ");

  f=/\{([^\|\{]+)\|([^\}]+)\}/.exec(v);
  if (f) {
    v=v.replace(f[1]+"|"+f[2],f[2]+"("+f[1]+")");
  }

  // replace braces
  v=v.replace(/\{\{\{?/g,"'+");
  v=v.replace(/\}\}\}?/g,"+'");
  return v;
}