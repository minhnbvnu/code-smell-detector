function fromStream (stream, opts) {
  opts = opts || {}
  const P = opts.Promise || Promise
  const istream = integrityStream(opts)
  return new P((resolve, reject) => {
    stream.pipe(istream)
    stream.on('error', reject)
    istream.on('error', reject)
    let sri
    istream.on('integrity', s => { sri = s })
    istream.on('end', () => resolve(sri))
    istream.on('data', () => {})
  })
}