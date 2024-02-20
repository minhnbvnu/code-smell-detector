function sticky() {
  const cover = dom.getNode('section.cover')
  if (!cover) {
    return
  }
  const coverHeight = cover.getBoundingClientRect().height

  if (window.pageYOffset >= coverHeight || cover.classList.contains('hidden')) {
    dom.toggleClass(dom.body, 'add', 'sticky')
  } else {
    dom.toggleClass(dom.body, 'remove', 'sticky')
  }
}