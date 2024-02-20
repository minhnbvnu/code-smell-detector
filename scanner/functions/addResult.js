function addResult(data, encoding, done) {
    results = results.concat(data.toString().split('\n').filter(Boolean).map(JSON.parse))
    done()
  }