function getRcPaths(name, cwd) {
  const configPaths = [];

  function pushConfigPath(...segments) {
    configPaths.push((_path || _load_path()).join(...segments));
    if (segments[segments.length - 1] === `.${name}rc`) {
      configPaths.push((_path || _load_path()).join(...segments.slice(0, -1), `.${name}rc.yml`));
    }
  }

  function unshiftConfigPath(...segments) {
    if (segments[segments.length - 1] === `.${name}rc`) {
      configPaths.unshift((_path || _load_path()).join(...segments.slice(0, -1), `.${name}rc.yml`));
    }
    configPaths.unshift((_path || _load_path()).join(...segments));
  }

  if (!isWin) {
    pushConfigPath(etc, name, 'config');
    pushConfigPath(etc, `${name}rc`);
  }

  if (home) {
    pushConfigPath((_constants || _load_constants()).CONFIG_DIRECTORY);
    pushConfigPath(home, '.config', name, 'config');
    pushConfigPath(home, '.config', name);
    pushConfigPath(home, `.${name}`, 'config');
    pushConfigPath(home, `.${name}rc`);
  }

  // add .yarnrc locations relative to the cwd
  while (true) {
    unshiftConfigPath(cwd, `.${name}rc`);

    const upperCwd = (_path || _load_path()).dirname(cwd);
    if (upperCwd === cwd) {
      // we've reached the root
      break;
    } else {
      // continue since there's still more directories to search
      cwd = upperCwd;
    }
  }

  const envVariable = `${name}_config`.toUpperCase();

  if (process.env[envVariable]) {
    pushConfigPath(process.env[envVariable]);
  }

  return configPaths;
}