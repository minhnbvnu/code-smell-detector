function generateLsCmd(nasPath, isAllOpt, isLongOpt) {
  let cmd = 'ls ' + (isAllOpt ? '-a ' : '') + (isLongOpt ? '-l ' : '') + nasPath;
  return cmd;
}