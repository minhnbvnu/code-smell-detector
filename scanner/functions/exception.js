function exception(e) {
    var stackDump, stack, message;

    if (e.stack && typeof e.stack !== 'string') {
      stackDump = StackParser.parse(e.stack);
      stack = stackDump[0];

      // Find the first stack that isn't a node module or an internal Node function
      while (stack && (stack.file.match('/node_modules') || !stack.file.match('/'))) {
        stack = stackDump.shift();
      }
    }

    if (stack && stack.file) {
      message = [
        stack.file.replace(cwd, ''),
        'Line ' + stack.line,
        e.message
      ].join('\n');
    } else {
      message = e.message;
    }

    return message;
  }