function generateRmCmd(nasPath, isRecursiveOpt, isForceOpt) {
  let cmd = 'rm ' + (isRecursiveOpt ? '-R ' : '') + (isForceOpt ? '-f ' : '') + nasPath;
  return cmd;
}