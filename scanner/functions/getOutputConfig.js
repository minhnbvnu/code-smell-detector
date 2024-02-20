function getOutputConfig() {
  if (process.env.BUILD_TESTS) {
    return {
      path: path.join(process.cwd(), 'tmp'),
      filename: '[name].js',
    }
  } else if (process.env.NODE_ENV === 'test') {
    return undefined
  } else {
    return {
      path: path.join(process.cwd(), 'dist'),
      filename: '[name].js',
      library: 'dateFns',
      libraryTarget: 'umd',
    }
  }
}