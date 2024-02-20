function buildCallback(file, watching) {
  return (err, stats) => {
    if (err) {
      console.error(`${chalk.red('error')} Error while building ${file}`)
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      process.exit(1)
    }

    const info = stats.toJson({
      chunks: false,
      colors: true,
      modules: false,
      assets: false,
      performance: false,
      reasons: false,
      version: false,
    })

    if (stats.hasErrors()) {
      console.error(`${chalk.red('error')} Error while building ${file}`)
      ;(info.errors || []).forEach(error => {
        console.error(error)
      })
      if (!watching) {
        process.exit(1)
      }
    } else {
      if (stats.hasWarnings() && !argv.quiet) {
        ;(info.warnings || []).forEach(warning => {
          console.warn(warning)
        })
      }
      console.log(
        `${
          watching ? '' : chalk.dim(`[${counter + 1}/${steps}] `)
        }${randomBuildEmoji()}  Built ${chalk.blue(file)} in ${chalk.grey(
          info.time
        )}ms`
      )
      if (!watching) {
        checkEnd()
      }
    }
  }
}