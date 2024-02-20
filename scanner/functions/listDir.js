async function listDir (dir, opts = {}) {
  return new Promise((resolve, reject) => {
    _list(dir, opts, (err, records) => {
      if (err) reject(err)
      else resolve(records)
    })
  })
}