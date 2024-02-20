function getEntryConfig() {
  if (process.env.BUILD_TESTS) {
    return {
      tests: './testWithoutLocales.js',
    }
  } else if (process.env.NODE_ENV === 'test') {
    return undefined
  } else {
    return {
      date_fns: './tmp/umd/index.js',
    }
  }
}