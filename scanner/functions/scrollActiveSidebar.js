function scrollActiveSidebar(router) {
  const cover = dom.find('.cover.show')
  coverHeight = cover ? cover.offsetHeight : 0

  const sidebar = dom.getNode('.sidebar')
  const lis = dom.findAll(sidebar, 'li')

  for (let i = 0, len = lis.length; i < len; i += 1) {
    const li = lis[i]
    const a = li.querySelector('a')
    if (!a) {
      continue
    }
    let href = a.getAttribute('href')

    if (href !== '/') {
      const {query: {id}, path} = router.parse(href)
      if (id) {
        href = getNavKey(path, id)
      }
    }

    if (href) {
      nav[decodeURIComponent(href)] = li
    }
  }

  if (isMobile) {
    return
  }
  const path = router.getCurrentPath()
  dom.off('scroll', () => highlight(path))
  dom.on('scroll', () => highlight(path))
  dom.on(sidebar, 'mouseover', () => {
    hoverOver = true
  })
  dom.on(sidebar, 'mouseleave', () => {
    hoverOver = false
  })
}