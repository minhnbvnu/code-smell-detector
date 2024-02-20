function applyTransitionDuration(els, duration) {
  els.forEach(el => {
    if (!el) return

    const isContent = matches.call(el, Selectors.CONTENT)

    const _duration = isContent
      ? Math.round(duration/1.3)
      : duration

    el.style[prefix('transitionDuration')] = _duration + 'ms'
  })
}