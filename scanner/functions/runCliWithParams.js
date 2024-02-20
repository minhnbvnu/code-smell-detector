function runCliWithParams(params) {
  return execSync(`node ${cliPath} ${params}`).toString();
}