function arrayEnvVarValue (envVarName) {
  var count = 0
  var result = []

  while (envVarSet(envVarName + '_' + count)) {
    result.push(process.env[envVarName + '_' + count])
    count++
  }

  return result
}