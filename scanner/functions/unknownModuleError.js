function unknownModuleError(id) {
  let message = 'Requiring unknown module "' + id + '".';
  if (__DEV__) {
    message +=
      'If you are sure the module is there, try restarting the packager or running "npm install".';
  }
  return Error(message);
}