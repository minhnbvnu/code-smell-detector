function getRollupOutput(format = process.env.BUILD_FORMAT) {
  const minify = parseEnv('BUILD_MINIFY', false)
  const filenameSuffix = process.env.BUILD_FILENAME_SUFFIX || ''
  const filename = [
    pkg.name,
    filenameSuffix,
    `.${format}`,
    minify ? '.min' : null,
    '.js',
  ]
    .filter(Boolean)
    .join('')

  const isPreact = parseEnv('BUILD_PREACT', false)
  const filenamePrefix =
    process.env.BUILD_FILENAME_PREFIX || (isPreact ? 'preact/' : '')
  const dirpath = path.join(...[filenamePrefix, 'dist'].filter(Boolean))
  return {dirpath, filename}
}