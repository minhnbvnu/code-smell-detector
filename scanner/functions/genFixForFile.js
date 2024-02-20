function genFixForFile(file, config) {
  return function () {
    var content = fs.readFileSync(file).toString()
    var fixed = ''

    var fmjOptions = commander.indentPref
      ? fu.merge(config, { indentpref: commander.indentPref })
      : config

    try {
      if (commander.legacy) {
        jshint(content, config)
        fixed = fixmyjs(jshint.data(), content, fmjOptions).run()
      } else {
        fixed = fixmyjs.fix(content, fmjOptions)
      }
    } catch (ex) {
      ex.stack = 'File: ' + file + '\n' + ex.stack
      throw ex
    }

    if (commander.dryRun || commander.diff) {
      printDiff(content, fixed)
    } else if (commander.patch) {
      createPatch(file, content, fixed)
    } else {
      fs.writeFileSync(file, fixed, 'utf8')
    }

    if (!commander.silent) {
      console.log('\u2713 ' + path.basename(file) + ' done.')
    }

    return content === fixed
  }
}