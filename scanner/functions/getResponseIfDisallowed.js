async function getResponseIfDisallowed (request, env) {
  // No CORS header, so can't do anything
  const origin = request.headers.get('origin')
  if (!origin) return null

  let originQuota = env.ORIGIN_QUOTA ? parseInt(env.ORIGIN_QUOTA) : 10000

  if (env.ALLOWED_ORIGINS) {
    if (!env.ORIGIN_QUOTA) {
      originQuota = 0
    }

    if (env.ALLOWED_ORIGINS.split(',').includes(origin)) {
      return null
    }
  }

  if (originQuota === 0) {
    return new Response('Unauthorized', { status: 401 })
  }

  const store = getStore(env)

  const d = new Date()
  const currentCountKey = `join-counts/${d.getYear()}-${d.getMonth()}/${encodeURIComponent(
    origin
  )}`
  const currentCountEntry = await store.get(currentCountKey)

  let currentCount = 0

  if (currentCountEntry) {
    currentCount = parseInt(await currentCountEntry.text())
  }

  if (currentCount >= originQuota) {
    return new Response('Over quota', { status: 429 })
  }

  // Do 1 out of RATE_LIMITING_SAMPLING_RATE sampling
  if (Math.random() < 1.0 / RATE_LIMITING_SAMPLING_RATE) {
    await store.put(
      currentCountKey,
      (currentCount + Math.floor(RATE_LIMITING_SAMPLING_RATE)).toString()
    )
  }
}