function getRcConfigForCwd(cwd, args) {
  const config = {};

  if (args.indexOf('--no-default-rc') === -1) {
    Object.assign(config, (_rc || _load_rc()).findRc('yarn', cwd, (fileText, filePath) => {
      return loadRcFile(fileText, filePath);
    }));
  }

  for (let index = args.indexOf('--use-yarnrc'); index !== -1; index = args.indexOf('--use-yarnrc', index + 1)) {
    const value = args[index + 1];

    if (value && value.charAt(0) !== '-') {
      Object.assign(config, loadRcFile((0, (_fs || _load_fs()).readFileSync)(value, 'utf8'), value));
    }
  }

  return config;
}