async function asyncPool({
  limit,
  items,
  fn
}) {
  const promises= []
  const pool = new Set()
  for (const item of items) {
    const promise = fn(item)
    promises.push(promise)
    pool.add(promise)
    const clean = () => pool.delete(promise)
    promise.then(clean, clean)
    if (pool.size >= limit) await Promise.race(pool)
  }
  return Promise.all(promises)
}