function decodeJSON(input, output, args) {
  var buf = "";
  input.on("data", function(chunk) {
    buf += chunk;
    if (args.S) sendStreaming();
  });
  input.on("end", function() {
    sendAll();
  });

  function sendAll() {
    if (!buf.length) return;
    output.write(JSON.parse(buf));
  }

  function sendStreaming(leave) {
    var list = buf.split("\n");
    buf = list.pop();
    list.forEach(function(str) {
      str = str.replace(/,\s*$/, "");
      if (!str.length) return;
      output.write(JSON.parse(str));
    });
  }
}