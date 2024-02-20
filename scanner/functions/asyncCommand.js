function asyncCommand(options) {
  return {
    ...options,
    builder(yargs) {
      if (options.builder) {
        Object.keys(options.builder).forEach(option => {
          if (option.positional) {
            yargs.positional(option, options.builder[option])
          } else {
            yargs.option(option, options.builder[option])
          }
        })
      }
    },
    handler(argv) {
      const r = options.handler(argv, done)
      if (r && r.then) r.then(result => done(null, result), done)
    },
  }
}