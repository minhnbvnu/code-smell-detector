async function lookupEntries (roomId, store) {
  let maxIndex = -1
  const maxIndexEntry = await store.get(`rooms/${roomId}/max_index`)

  if (maxIndexEntry) {
    maxIndex = parseInt(await maxIndexEntry.text())
  }

  const entries = []
  const ps = []

  // read a few ahead of max index just to reduce latency during small groups joining on KV
  // read entries as promises first to parallelize reads. if the entries are empty then don't do this.
  for (let i = 0; i <= maxIndex; i++) {
    const p = store
      .get(`rooms/${roomId}/entries:${i}`)
      .then(v => (v ? v.json() : v))

    entries.push(p)
    ps.push(p)

    // Connection limit
    if (ps.length >= 2) {
      await Promise.all(ps)
      ps.length = 0
    }
  }

  await Promise.all(ps)

  return [entries, maxIndex]
}