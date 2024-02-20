function boolEnvVarValue (envVarName) {
  var value = process.env[envVarName]

  if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  } else {
    return value
  }
}