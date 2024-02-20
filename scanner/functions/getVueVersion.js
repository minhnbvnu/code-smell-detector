function getVueVersion () {
  const packageFile = path.join(CWD, 'package.json')

  if (fs.existsSync(packageFile)) {
    const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'))

    // Override
    if (pkg.meteor && typeof pkg.meteor.vueVersion !== 'undefined') {
      return parseInt(pkg.meteor.vueVersion)
    }

    const vue = (pkg.dependencies && pkg.dependencies.vue) ||
    (pkg.devDependencies && pkg.devDependencies.vue) ||
    (pkg.peerDependencies && pkg.peerDependencies.vue)

    if (vue) {
      const reg = /\D*(\d).*/gi
      const result = reg.exec(vue)
      if (result && result.length >= 2) {
        return parseInt(result[1])
      }
    }
  }

  return 1
}