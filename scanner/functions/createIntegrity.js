function createIntegrity (opts) {
  opts = opts || {}
  const algorithms = opts.algorithms || ['sha512']
  const optString = opts.options && opts.options.length
  ? `?${opts.options.join('?')}`
  : ''

  const hashes = algorithms.map(crypto.createHash)

  return {
    update: function (chunk, enc) {
      hashes.forEach(h => h.update(chunk, enc))
      return this
    },
    digest: function (enc) {
      const integrity = algorithms.reduce((acc, algo) => {
        const digest = hashes.shift().digest('base64')
        const hash = new Hash(
          `${algo}-${digest}${optString}`,
          opts
        )
        if (hash.algorithm && hash.digest) {
          const algo = hash.algorithm
          if (!acc[algo]) { acc[algo] = [] }
          acc[algo].push(hash)
        }
        return acc
      }, new Integrity())

      return integrity
    }
  }
}