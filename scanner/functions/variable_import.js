function variable_import(remote, name, module) {
  if (arguments.length < 3) module = name, name = remote;
  return variable_defineImpl.call(this, String(name), [module._resolve(String(remote))], identity);
}