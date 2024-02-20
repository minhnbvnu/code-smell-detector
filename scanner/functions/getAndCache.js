function getAndCache (url) {
  const xhr = new XMLHttpRequest() // eslint-disable-line

  if (cache[url]) {
    return cache[url]
  }

  xhr.open('GET', url, false)
  xhr.send()
  const script = xhr.responseText
  cache[url] = evalJS(script)
  return cache[url]
}