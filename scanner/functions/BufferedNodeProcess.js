constructor({ command, args, options = {}, stdout, stderr, exit }) {
    options.env = options.env || Object.create(process.env);
    options.env.ELECTRON_RUN_AS_NODE = 1;
    options.env.ELECTRON_NO_ATTACH_CONSOLE = 1;

    args = args ? args.slice() : [];
    args.unshift(command);
    args.unshift('--no-deprecation');

    super({
      command: process.execPath,
      args,
      options,
      stdout,
      stderr,
      exit
    });
  }