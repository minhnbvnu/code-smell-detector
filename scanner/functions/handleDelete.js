async function handleDelete (request, env, context) {
  const headers = { ...corsHeaders, Vary: 'Origin' }
  const payload = await request.json()

  if (!payload.dk) {
    return new Response('Missing delete key', { status: 400, headers })
  }

  const errorResponse = validatePayload(headers, payload)
  if (errorResponse) return errorResponse

  const roomId = payload.r
  const store = getStore(env)

  const [entries, maxIndex] = await lookupEntries(roomId, store)

  for (let i = 0; i < entries.length; i++) {
    const value = await entries[i]

    if (value) {
      entries[i] = value
    } else {
      entries[i] = null
    }
  }

  for (let i = 0; i < entries.length; i++) {
    if (entries[i] === null) continue

    const entry = entries[i]
    const entrySessionId = getEntrySessionId(entry)
    const entryContextId = getEntryContextId(entry)
    const entryDeleteKey = getEntryDeleteKey(entry)

    if (
      payload.k === entryContextId &&
      payload.d[0] === entrySessionId &&
      payload.dk === entryDeleteKey
    ) {
      context.waitUntil(store.delete(`rooms/${roomId}/entries:${i}`))

      if (maxIndex === i) {
        const now = new Date().getTime()

        context.waitUntil(
          store.put(`rooms/${roomId}/max_index`, `${i - 1}`, {
            customMetadata: { expireAt: now + 8 * 60 * 60 * 1000 }
          })
        )
      }

      return new Response('{}', { status: 200, headers })
    }
  }

  return new Response('No delete key', { status: 404, headers })
}