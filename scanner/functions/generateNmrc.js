function generateNmrc(state) {
  const file = new VFile({
    path: new URL(state.name + '/.npmrc', packagesUrl),
    value: ['ignore-scripts=true', 'package-lock=false', ''].join('\n')
  })

  file.data.changed = true

  return file
}