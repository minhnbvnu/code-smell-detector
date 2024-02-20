async function buildPlugin() {
  let manifestJSON
  try {
    // delete the require cache so that we can require it anew (when watching)
    delete require.cache[manifest]
    manifestJSON = require(manifest)

    // set the identifier because we need it to reload the plugin
    skpmConfig.identifier =
      manifestJSON.identifier || skpmConfig.identifier || skpmConfig.name
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  const commands = getCommands(manifestJSON)
  const resources = await getResources(skpmConfig)
  const assets = await getAssets(skpmConfig)
  steps = commands.length + resources.length + assets.length + 1

  const now = Date.now()

  // start by copying the manifest
  try {
    await copyManifest(manifestJSON)
    if (!argv.watch) {
      console.log(
        `${chalk.dim(`[${counter + 1}/${steps}]`)} 🖨  Copied ${chalk.blue(
          skpmConfig.manifest
        )} in ${chalk.grey(Date.now() - now)}ms`
      )
      checkEnd()
    } else {
      console.log(
        `🖨  Copied ${chalk.blue(skpmConfig.manifest)} in ${chalk.grey(
          Date.now() - now
        )}ms`
      )
    }
  } catch (err) {
    console.error(
      `${chalk.red('error')} Error while copying ${skpmConfig.manifest}`
    )
    console.error(err)
    if (!argv.watch) {
      process.exit(1)
    }
  }

  // then copy the assets
  // we do not watch them because we would need to spin a new chokidar instance and that's expensive
  // if you add a new asset, just restart the build
  await Promise.all(assets.map(copyAsset))

  // and then, build the commands
  return buildCommandsAndResources(commands, resources, argv.watch)
}