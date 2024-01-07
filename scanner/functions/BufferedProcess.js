constructor({
    command,
    args,
    options = {},
    stdout,
    stderr,
    exit,
    autoStart = true
  } = {}) {
    this.emitter = new Emitter();
    this.command = command;
    this.args = args;
    this.options = options;
    this.stdout = stdout;
    this.stderr = stderr;
    this.exit = exit;
    if (autoStart === true) {
      this.start();
    }
    this.killed = false;
  }