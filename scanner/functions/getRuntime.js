function getRuntime(codeUri, functionRes, options) {
  let moduleRuntime;

  if (fs.existsSync(path.join(codeUri, 'fun.yml'))) {
    moduleRuntime = FunModule.load(path.join(codeUri, 'fun.yml')).runtime;
  }

  if (options.runtime) {
    if (moduleRuntime && options.runtime !== moduleRuntime) {
      throw new Error(red(`'${options.runtime}' specified by --runtime option doesn't match the one in fun.yml.`));
    }
    return options.runtime;
  } else if (options.function) {
    if (functionRes && functionRes.Properties && functionRes.Properties.Runtime) {
      if (moduleRuntime) {
        if (functionRes.Properties.Runtime !== moduleRuntime) {
          throw new Error(red(`'runtime' in template.yml and fun.yml is not equal`));
        }
      }
      return functionRes.Properties.Runtime;
    }
  } else if (moduleRuntime) {
    return moduleRuntime;
  }
  throw new Error(red('\'runtime\' is missing, you should specify it by --runtime option.'));
}