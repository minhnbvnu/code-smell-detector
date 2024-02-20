function transform_vector_template(cmds, xr, yr, offset) {
  var cmd_str = "";
  for (var i = 0; i<cmds.length; i+=2) {
    var vals = cmds[i+1];
    for (var j = 0; j<vals.length; j+=2) {
      vals[j]*=(2*xr/100.0);
      vals[j+1]*=(2*yr/100.0);
    }

    cmd_str+=cmds[i]+cmds[i+1].join(',')+" ";
  }
  return cmd_str;
}