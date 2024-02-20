function CLI() {
  var input;
  var pass = new Stream.PassThrough({objectMode: true});
  var output;

  var args = {};
  Array.prototype.forEach.call(arguments, function(val) {
    if (val[0] === "-") {
      val.split("").forEach(function(c) {
        args[c] = true;
      });
    } else if (!input) {
      input = val;
    } else {
      output = val;
    }
  });

  if (args.h) return help();
  if (!Object.keys(args).length) return help();

  if (input === "-") input = null;
  if (output === "-") output = null;
  input = input ? fs.createReadStream(input) : process.stdin;
  output = output ? fs.createWriteStream(output) : process.stdout;

  if (args.j) {
    var spacer = args[2] ? "  " : args[1] ? " " : null;
    pass.on("data", function(data) {
      output.write(JSON.stringify(data, null, spacer) + "\n");
    });
  } else {
    // pass.pipe(msgpack.createEncodeStream()).pipe(output);
    pass.on("data", function(data) {
      output.write(msgpack.encode(data));
    });
  }

  if (args.J || args.S) {
    decodeJSON(input, pass, args);
  } else {
    input.pipe(msgpack.createDecodeStream()).pipe(pass);
  }
}