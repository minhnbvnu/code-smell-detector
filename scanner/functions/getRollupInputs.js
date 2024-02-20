function getRollupInputs() {
  const buildInputGlob =
    process.env.BUILD_INPUT ||
    (hasTypescript ? 'src/index.{js,ts,tsx}' : 'src/index.js')
  const input = glob.sync(toPOSIX(fromRoot(buildInputGlob)))
  if (!input.length) {
    throw new Error(`Unable to find files with this glob: ${buildInputGlob}`)
  }
  return input
}