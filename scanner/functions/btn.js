function btn(el) {
  const toggle = _ => dom.body.classList.toggle('close')

  el = dom.getNode(el)
  dom.on(el, 'click', e => {
    e.stopPropagation()
    toggle()
  })

  isMobile &&
    dom.on(
      dom.body,
      'click',
      _ => dom.body.classList.contains('close') && toggle()
    )
}