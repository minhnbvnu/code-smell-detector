function preProcess(src) {
  var m
  var lines = src.split('\n')

  var r = regex['comment']

  for (var i in lines) {
    if ((m = lines[i].match(r))) {
      /*                var cmt = "";
            if(typeof m[3] != "undefined")
                lines[i] = m[1];
            else if(typeof m[3] != "undefined")
                lines[i] = m[3];
            else
                lines[i] = "";
                */
      if (typeof m[3] !== 'undefined') {
        lines[i] = m[0].substr(0, m[0].length - m[3].length)
      }
    }
  }

  return lines.join('\n')
}