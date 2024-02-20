async function processEntries () {
  const { transformers = [], cleaners = [], filters = [], sorters = [] } = compile()

  posts = JSON.parse(JSON.stringify(Array.from(entries.values()))) // deep clone

  for (const transform of transformers) {
    posts = await transform(posts)
  }

  for (const cleanup of cleaners) {
    posts = await cleanup(posts)
  }

  for (const filter of filters) {
    posts = await filter(posts)
  }

  for (const sort of sorters) {
    posts = await sort(posts)
  }

  if (bootstraped) emitter.emit('update')
}