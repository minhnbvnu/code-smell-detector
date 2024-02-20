async function buildCommandsAndResources(commands, resources, watch) {
  const webpackConfig = await generateWebpackConfig(
    argv,
    output,
    manifestFolder,
    skpmConfig
  )

  const compilers = []
  const entries = commands.concat(
    (resources || []).map(resource => ({
      isPluginCommand: false,
      script: resource,
      absolutePath: path.join(process.cwd(), resource),
    }))
  )

  // eslint-disable-next-line no-restricted-syntax
  for (const entry of entries) {
    const compiler = webpack(await webpackConfig(entry))
    if (watch) {
      // https://github.com/webpack/webpack.js.org/issues/125
      // watchOptions need to be manually passed to the watch() method.
      compilers.push(
        compiler.watch(
          compiler.options.watchOptions,
          buildCallback(entry.script, watch)
        )
      )
    } else {
      compiler.run(buildCallback(entry.script))
    }
  }

  return compilers
}