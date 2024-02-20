function getAndActive(router, el, isParent, autoTitle) {
  el = dom.getNode(el)

  const links = dom.findAll(el, 'a')
  const hash = decodeURI(router.toURL(router.getCurrentPath()))
  let target

  links.sort((a, b) => b.href.length - a.href.length).forEach(a => {
    const href = a.getAttribute('href')
    const node = isParent ? a.parentNode : a

    if (hash.indexOf(href) === 0 && !target) {
      target = a
      dom.toggleClass(node, 'add', 'active')
    } else {
      dom.toggleClass(node, 'remove', 'active')
    }
  })

  if (autoTitle) {
    dom.$.title = target ? (target.title || `${target.innerText} - ${title}`) : title
  }

  return target
}