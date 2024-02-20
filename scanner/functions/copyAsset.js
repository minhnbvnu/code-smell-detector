async function copyAsset(asset) {
  const dirWithoutFirst = path
    .normalize(asset)
    .split(path.sep)
    .splice(1)
    .join(path.sep)

  const destPath = path.join(output, 'Contents', 'Resources', dirWithoutFirst)

  await mkdirp(path.dirname(destPath))

  return new Promise((resolve, reject) => {
    const callback = err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    }
    if (fs.copyFile) {
      fs.copyFile(asset, destPath, callback)
    } else {
      exec(`cp "${asset}" "${destPath}"`, callback)
    }
  })
    .then(() => {
      console.log(
        `${
          argv.watch ? '' : chalk.dim(`[${counter + 1}/${steps}] `)
        }${randomBuildEmoji()}  Copied ${chalk.blue(asset)}`
      )
      if (!argv.watch) {
        checkEnd()
      }
    })
    .catch(err => {
      console.error(`${chalk.red('error')} Error while copying ${asset}`)
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      process.exit(1)
    })
}