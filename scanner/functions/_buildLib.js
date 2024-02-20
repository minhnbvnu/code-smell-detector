function _buildLib (DEST, platform) {
  let output = []
  if (platform === 'browser' || platform === 'all') {
    output.push({
      file: DEST + 'texture.js',
      format: 'umd',
      name: 'texture',
      globals: {
        'substance': 'substance',
        'katex': 'katex',
        'vfs': 'vfs'
      },
      sourcemap: true
    })
  }
  if (platform === 'nodejs' || platform === 'all') {
    output.push({
      file: DEST + 'texture.cjs.js',
      format: 'cjs',
      sourcemap: true
    })
  }
  if (platform === 'es' || platform === 'all') {
    output.push({
      file: DEST + 'texture.es.js',
      format: 'esm',
      sourcemap: true
    })
  }
  rollup(b, {
    input: './index.js',
    external: ['substance', 'katex', 'vfs'],
    output,
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**'
      })
    ]
  })
}