function createBundle ({ name, env, format }) {
  return rollupBundle({
    env
  }).then(function (bundle) {
    const options = Object.assign({}, bundleOptions)
    if (format) {
      options.format = format
    }

    const code = bundle.generate(options).code
    if (/min$/.test(name)) {
      const minified = uglify.minify(code, {
        output: {
          preamble: banner,
          ascii_only: true // eslint-disable-line camelcase
        }
      }).code
      return write(`dist/${name}.js`, minified)
    } else {
      return write(`dist/${name}.js`, code)
    }
  }).catch(logError)
}