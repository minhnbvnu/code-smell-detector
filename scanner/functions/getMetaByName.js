function getMetaByName (name, type = 'meta') {
  const metas = window.document.getElementsByTagName('meta')
  return Array.prototype.find.call(metas, (meta) => {
    return meta.getAttribute('name') === name
  })
}