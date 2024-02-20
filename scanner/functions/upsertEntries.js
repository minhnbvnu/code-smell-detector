async function upsertEntries () {
  const { sources = [], builders = [] } = compile()

  async function build (buildOptions) {
    for (const build of builders) {
      await build(buildOptions, {
        create: createOptions => {
          const entry = createEntry(createOptions)
          entries.set(entry.data.__id, entry)

          if (bootstraped) emitter.emit('entries.update', entry.data.__id)
        }
      })
    }
  }

  function remove (removeOptions) {
    const __id = createId(removeOptions.filePath)
    entries.delete(__id)

    if (bootstraped) emitter.emit('entries.update', __id)
  }

  for (const source of sources) {
    await source({ build, remove })
  }
}