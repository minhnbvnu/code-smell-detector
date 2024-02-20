function parseFunctionPath(funcPath) {
  let serviceName = null;
  let functionName = null;

  if (!funcPath) { return []; }

  const index = funcPath.indexOf('/');
  if (index < 0) {
    functionName = funcPath;
  } else {
    serviceName = funcPath.substring(0, index);
    functionName = funcPath.substring(index + 1);
  }
  debug(`invoke service: ${serviceName}`);
  debug(`invoke function: ${functionName}`);
  return [serviceName, functionName];
}