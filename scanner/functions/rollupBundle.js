function rollupBundle ({ env }) {
  return rollup({
    entry: 'src/index.js',
    external: ['luxon'],
    plugins: [
      node({
        extensions: ['.js', '.vue']
      }),
      cjs(),
      vue({
        compileTemplate: true,
        css (styles, stylesNodes) {
          // Only generate the styles once
          if (env['process.env.NODE_ENV'] === '"production"') {
            Promise.all(
              stylesNodes.map(processStyle)
            ).then(css => {
              const result = css.map(c => c.css).join('')
              // write the css for every component
              // TODO add it back if we extract all components to individual js
              // files too
              // css.forEach(writeCss)
              write(`dist/${name}.css`, result)
              write(`dist/${name}.min.css`, new CleanCSS().minify(result).styles)
            }).catch(logError)
          }
        }
      }),
      replace(Object.assign({
        __VERSION__: version
      }, env)),
      buble({
        objectAssign: 'Object.assign'
      })
    ]
  })
}