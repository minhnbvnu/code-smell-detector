function spawnScript() {
  // get all the arguments of the script and find the position of our script commands
  const args = process.argv.slice(2)
  const scriptIndex = args.findIndex(x =>
    [
      'build',
      'format',
      'lint',
      'pre-commit',
      'test',
      'validate',
      'typecheck',
    ].includes(x),
  )

  // Extract the node arguments so we can pass them to node later on
  const buildCommand = scriptIndex === -1 ? args[0] : args[scriptIndex]
  const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []

  if (!buildCommand) {
    throw new Error(`Unknown script "${script}".`)
  }

  const relativeScriptPath = path.join(__dirname, './scripts', buildCommand)
  const scriptPath = attemptResolve(relativeScriptPath)
  if (!scriptPath) {
    throw new Error(`Unknown script "${script}".`)
  }

  // Attempt to strt the script with the passed node arguments
  const result = spawn.sync(
    executor,
    nodeArgs.concat(scriptPath).concat(args.slice(scriptIndex + 1)),
    {
      stdio: 'inherit',
      env: getEnv(),
    },
  )

  if (result.signal) {
    handleSignal(result)
  } else {
    process.exit(result.status)
  }
}