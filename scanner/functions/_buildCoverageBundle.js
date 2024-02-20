function _buildCoverageBundle (target) {
  let output = []
  if (target === 'browser') {
    output.push({
      file: 'tmp/texture.instrumented.js',
      format: 'umd',
      name: 'texture',
      globals: {
        'substance': 'substance',
        'katex': 'katex'
      }
    })
  }
  if (target === 'nodejs') {
    output.push({
      file: 'tmp/texture.instrumented.cjs.js',
      format: 'cjs'
    })
  }
  rollup(b, {
    input: './index.js',
    external: [
      'substance',
      'katex'
    ],
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**'
      }),
      istanbul({
        include: [
          'src/**/*.js'
        ]
      })
    ],
    output
  })
}