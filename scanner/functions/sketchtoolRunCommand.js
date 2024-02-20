function sketchtoolRunCommand(output, commandIdentifier, options = {}) {
  let command = ''

  if (options.pre) {
    command += options.pre
    command += ' '
  }

  command += `"${getSketchPath(
    options.app || process.env.SKETCH_PATH
  )}/Contents/Resources/sketchtool/bin/sketchtool" run "${output}" "${commandIdentifier}"`

  if (options.withoutActivating) {
    command += ' --without-activating'
  }

  if (options.waitForExit) {
    command += ' --wait-for-exit'
  }

  if (options.withoutWaitingForPlugin) {
    command += ' --without-waiting-for-plugin'
  }

  if (options.context) {
    command += ` --context="${JSON.stringify(options.context).replace(
      /"/g,
      '\\"'
    )}"`
  }

  if (options.post) {
    command += ' '
    command += options.post
  }

  if (options.handleError === false) {
    return command
  }

  const handleError =
    // check if the run command doesn't exist
    'if (echo "$res" | grep "Unknown command ‘run’"); then ' +
    'echo "Only available on Sketch 43+"; ' +
    // check if we can't find sketch
    'elif (echo "$res" | grep "such file or directory"); then ' +
    'echo "Looks like we can\'t find Sketch.app.\\nYou can specify where to look for it by running:\\n\\necho \\"sketchPath: ABSOLUTE/PATH/TO/Sketch.app\\" > ~/.skpmrc"; ' +
    // not sure why else doesn't work
    'elif (true); then ' +
    'echo "$res"; ' +
    'fi'

  // run the command and redirect the stderr to stdout so that we can check against it
  return `res=$(${command} 2>&1); ${handleError}`
}