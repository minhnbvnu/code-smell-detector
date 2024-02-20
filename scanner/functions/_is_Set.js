function _is_Set(envName) {
  // console.log("envName",envName);
  // console.log("process.env[envName]",process.env[envName]);
  var env = process.env[envName];
  if (env === null || env === undefined || env.length === 0) {
    return false;
  }
  return true;
}