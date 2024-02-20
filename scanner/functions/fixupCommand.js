function fixupCommand(options, callback) {
  if (!options.pmBaseDir) {
    if (fs.existsSync(path.resolve(options.cwd, '.strong-pm'))) {
      options.pmBaseDir = '.strong-pm';
    } else {
      options.pmBaseDir = '.';
    }
  }
  options.pmBaseDir = path.resolve(options.cwd, options.pmBaseDir);

  options.execpath = process.execPath;
  options.script = [
    require.resolve('../bin/sl-pm'),
    '--listen', options.pmPort,
    '--base', options.pmBaseDir,
    '--base-port', options.basePort,
    '--driver', options.driver,
  ].join(' ');

  return writeSeedEnvironment(options, callback);
}