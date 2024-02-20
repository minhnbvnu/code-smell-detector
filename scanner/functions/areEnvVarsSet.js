function areEnvVarsSet(dryRun) {
  if (dryRun) {
    return process.env.hasOwnProperty('GITHUB_TOKEN')
  }
  missingEnvVars = requiredEnvVars.filter((envVar) => !process.env.hasOwnProperty(envVar))
  return missingEnvVars.length === 0
}