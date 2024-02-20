async function source ({ path: pathOptions, ignore, includes = '**/*.*', data = {} } = {}, { build, remove }) {
  assert(pathOptions, 'The path is required in source-filesystem plugin configuration.')
  // Make sure path is absolute.
  const path = !isAbsolute(pathOptions) ? resolve(process.cwd(), pathOptions) : pathOptions
  // Use path with includes to create a glob
  const watcher = chokidar.watch(normalize(`${path}/${includes}`), {
    ignored: [
      ...DEFAULT_IGNORES,
      ...(ignore || [])
    ]
  })

  // We'll enqueue the first batch. Then after ready we will process updates one by one.
  let batch = true
  const queue = []

  // add file
  watcher.on('add', async filePath => {
    batch ? queue.push(filePath) : await build(buildOptions(filePath, path, data))
  })
  // modify file
  watcher.on('change', async filePath => {
    await build(buildOptions(filePath, path, data))
  })
  // remove file
  watcher.on('unlink', async filePath => {
    await remove({ filePath })
  })

  // TODO: do we need to process `addDir`, `unlinkDir`?

  return new Promise((resolve) => {
    watcher.on('ready', async () => {
      for (const filePath of queue) {
        await build(buildOptions(filePath, path, data))
      }
      batch = false
      resolve()
    })
  })
}