function sendJSON (path, options) {
  return fetch(path, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options.json && {
      body: JSON.stringify(options.json),
    },
    ...options
  })
}