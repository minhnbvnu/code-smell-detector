function getAllPaths(router) {
  const paths = []

  Docsify.dom.findAll('.sidebar-nav a:not(.section-link):not([data-nosearch])').forEach(node => {
    const href = node.href
    const originHref = node.getAttribute('href')
    const path = router.parse(href).path

    if (
      path &&
      paths.indexOf(path) === -1 &&
      !Docsify.util.isAbsolutePath(originHref)
    ) {
      paths.push(path)
    }
  })

  return paths
}