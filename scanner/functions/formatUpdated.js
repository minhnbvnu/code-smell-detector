function formatUpdated(html, updated, fn) {
  updated =
    typeof fn === 'function' ?
      fn(updated) :
      typeof fn === 'string' ?
        tinydate(fn)(new Date(updated)) :
        updated

  return html.replace(/{docsify-updated}/g, updated)
}