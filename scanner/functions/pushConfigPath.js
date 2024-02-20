function pushConfigPath(...segments) {
    configPaths.push((_path || _load_path()).join(...segments));
    if (segments[segments.length - 1] === `.${name}rc`) {
      configPaths.push((_path || _load_path()).join(...segments.slice(0, -1), `.${name}rc.yml`));
    }
  }