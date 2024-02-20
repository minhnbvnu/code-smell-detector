function sendStreaming(leave) {
    var list = buf.split("\n");
    buf = list.pop();
    list.forEach(function(str) {
      str = str.replace(/,\s*$/, "");
      if (!str.length) return;
      output.write(JSON.parse(str));
    });
  }