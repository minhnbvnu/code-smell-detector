async function buildAndWatchPlugin() {
  let compilers = await buildPlugin()

  if (argv.watch) {
    fs.watch(manifest, async () => {
      // manifest has changed, we need to rebuild the plugin entirely

      if (compilers && compilers.length) {
        // if we are watching the commands, close the watchers first
        await Promise.all(
          compilers.map(
            c =>
              new Promise(resolve => {
                if (c) {
                  c.close(resolve)
                } else {
                  resolve()
                }
              })
          )
        )
      }

      compilers = await buildPlugin()
    })
  }
}