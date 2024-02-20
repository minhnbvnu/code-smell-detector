function posixEnvVarName (optionName) {
  return 'SCRIPTY_' + _.snakeCase(optionName).toUpperCase()
}