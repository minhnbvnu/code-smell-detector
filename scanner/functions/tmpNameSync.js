function tmpNameSync(options) {
  var
    args = _parseArguments(options),
    opts = args[0],
    tries = opts.name ? 1 : opts.tries || DEFAULT_TRIES;

  if (isNaN(tries) || tries < 0)
    throw new Error('Invalid tries');

  if (opts.template && !opts.template.match(TEMPLATE_PATTERN))
    throw new Error('Invalid template provided');

  do {
    const name = _generateTmpName(opts);
    try {
      fs.statSync(name);
    } catch (e) {
      return name;
    }
  } while (tries-- > 0);

  throw new Error('Could not get a unique tmp filename, max tries reached');
}