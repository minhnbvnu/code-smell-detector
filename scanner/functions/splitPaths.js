function splitPaths(cmds) {

  var paths = [], current;
  for (var i = 0; i < cmds.length; i++) {
    if (cmds[i].type === 'M') {
      if (current) {
        paths.push(current);
      }
      current = [];
    }
    current.push(cmdToArr(cmds[i]));
  }
  paths.push(current);

  return paths;
}