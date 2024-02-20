async function handlePost (request, env, context) {
  const headers = { ...corsHeaders, Vary: 'Origin' }

  const payload = await request.json()
  const errorResponse = validatePayload(headers, payload)

  if (errorResponse) return errorResponse
  const store = getStore(env)

  const roomId = payload.r
  const now = new Date().getTime()

  // R2 needs vacuum
  const nextVacuumEntry = store.get(`rooms/${roomId}/next_vacuum`)

  const [entries, maxIndex] = await lookupEntries(roomId, store)

  for (let i = 0; i < entries.length; i++) {
    const value = await entries[i]

    if (value) {
      entries[i] = value
    } else {
      entries[i] = null
    }
  }

  const contextId = payload.k
  let deleteKeyForEntry = null

  if (payload.d && payload.p) {
    // This is the timestamp on the session side of this data set if this changes, we write to the store
    const timestamp = payload.t
    const packages = payload.p
    deleteKeyForEntry = getRandomString(24)

    let shouldSave = true

    // Need to save the entry if it doesn't exist already.
    for (let i = 0; i < entries.length; i++) {
      if (entries[i] === null) continue

      const entry = entries[i]
      const entryContextId = getEntryContextId(entry)
      const entryTimestamp = getEntryTimestamp(entry)
      const entryDeleteKey = getEntryDeleteKey(entry)

      if (contextId === entryContextId) {
        deleteKeyForEntry = entryDeleteKey

        if (entryTimestamp === timestamp) {
          shouldSave = false
        }

        break
      }
    }

    if (shouldSave) {
      let saved = false

      // Entry is the payload plus additional data that isn't directly returned to the session.
      const newEntry = [
        ...payload.d,
        timestamp,
        packages,
        contextId,
        deleteKeyForEntry
      ]

      // Cap expiration to 15 minutes
      const expireIn = Math.min(15 * 60 * 1000, payload.x)
      const putOptions = { customMetadata: { expireAt: now + expireIn } }

      // First search for an exisitng one
      for (let i = 0; i < entries.length; i++) {
        if (entries[i] === null) continue

        const entry = entries[i]

        const entryContextId = getEntryContextId(entry)
        if (entryContextId !== contextId) continue

        if (saved) {
          // Duplicate, weird
          context.waitUntil(store.delete(`rooms/${roomId}/entries:${i}`))
          entries[i] = null
        } else {
          context.waitUntil(
            store.put(
              `rooms/${roomId}/entries:${i}`,
              JSON.stringify(newEntry),
              putOptions
            )
          )
          entries[i] = newEntry
          saved = true
        }
      }

      // Could not find an existing slot to replace, so look for an empty slot or add to the end.
      if (!saved) {
        // Look for a null slot
        for (let i = 0; i < entries.length; i++) {
          if (entries[i] !== null) continue
          context.waitUntil(
            store.put(
              `rooms/${roomId}/entries:${i}`,
              JSON.stringify(newEntry),
              putOptions
            )
          )
          entries[i] = newEntry
          saved = true
          break
        }

        // Otherwise push a new entry
        if (!saved) {
          entries.push(newEntry)
          context.waitUntil(
            store.put(
              `rooms/${roomId}/entries:${entries.length - 1}`,
              JSON.stringify(newEntry),
              putOptions
            )
          )
        }
      }
    }

    for (let i = entries.length - 1; i >= 0; i--) {
      if (entries[i] === null) continue

      // max index always increases, rely on expiration to lower watermark
      if (maxIndex < i) {
        context.waitUntil(
          store.put(`rooms/${roomId}/max_index`, `${i}`, {
            customMetadata: { expireAt: now + 8 * 60 * 60 * 1000 }
          })
        )
        break
      }
    }
  }

  // Build the peer payload, list and the packages.
  const map = new Map()
  const packages = []

  for (let i = 0; i < entries.length; i++) {
    if (entries[i] === null) continue

    const entry = entries[i]
    const entryContextId = getEntryContextId(entry)
    if (contextId === entryContextId) continue

    const timestamp = getEntryTimestamp(entry)

    // Get the earliest entry for a given context id.
    if (!map.has(entryContextId)) {
      map.set(entryContextId, entry.slice(0, getEntryPayloadLength(entry)))
    } else {
      const existing = map.get(entryContextId)

      if (existing[existing.length - 1] < timestamp) {
        map.set(entryContextId, entry.slice(0, getEntryPayloadLength(entry)))
      }
    }

    // Add to the packages due to this session.
    if (payload.d) {
      const sessionId = payload.d[0]
      const entryPackages = getEntryPackages(entry)

      for (let j = 0; j < entryPackages.length; j++) {
        // Package was meant for this session
        if (entryPackages[j][0] === sessionId) {
          packages.push(entryPackages[j])
        }
      }
    }
  }

  const peers = [...map.values()]
  const responseData = { ps: peers, pk: packages }

  if (deleteKeyForEntry) {
    responseData.dk = deleteKeyForEntry
  }

  // Check for vacuum
  const nextVacuumEntryValue = await nextVacuumEntry

  if (
    !nextVacuumEntryValue ||
    now > parseInt(await nextVacuumEntryValue.text())
  ) {
    // Add a random delay and re-check to avoid stampede.
    context.waitUntil(
      new Promise(res => {
        setTimeout(async () => {
          const now = new Date().getTime()
          const nextVacuumEntry = await store.get(`rooms/${roomId}/next_vacuum`)

          if (
            !nextVacuumEntry ||
            now > parseInt(await nextVacuumEntry.text())
          ) {
            let removed = 0

            // Vacuum
            await store.put(`rooms/${roomId}/next_vacuum`, `${now + 30 * 1000}`) // One mintue room vacuum interval

            const list = await store.list({
              include: ['customMetadata'],
              prefix: `rooms/${roomId}/`
            })
            const removePromises = []

            for (const {
              key,
              customMetadata: { expireAt }
            } of list.objects) {
              if (!expireAt || now < expireAt) continue
              removePromises.push(store.delete(key))
              removed++

              if (removePromises.length >= 5) {
                await Promise.all(removePromises)
                removePromises.length = 0
              }
            }

            await Promise.all(removePromises)

            console.log(
              'Vacuumed room ' +
                roomId +
                '. Removed ' +
                (removed + 1) +
                ' keys.'
            )
          }

          res()
        }, Math.floor(Math.random() * 10 * 1000))
      })
    )
  }

  return new Response(JSON.stringify(responseData), { status: 200, headers })
}