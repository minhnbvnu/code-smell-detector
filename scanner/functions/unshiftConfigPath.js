function unshiftConfigPath(...segments) {
    if (segments[segments.length - 1] === `.${name}rc`) {
      configPaths.unshift((_path || _load_path()).join(...segments.slice(0, -1), `.${name}rc.yml`));
    }
    configPaths.unshift((_path || _load_path()).join(...segments));
  }