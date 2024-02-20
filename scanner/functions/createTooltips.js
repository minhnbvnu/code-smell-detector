function createTooltips(els) {
  return els.reduce((a, el) => {
    const id = idCounter

    const settings = evaluateSettings(
      this.settings.performance
        ? this.settings
        : getIndividualSettings(el, this.settings)
    )

    const { html, reactDOM, trigger, touchHold } = settings

    const title = el.getAttribute('title')
    if (!title && !html && !reactDOM) return a

    el.setAttribute('data-tooltipped', '')
    el.setAttribute('aria-describedby', `tippy-tooltip-${id}`)
    removeTitle(el)

    const popper = createPopperElement(id, title, settings)
    const handlers = getEventListenerHandlers.call(this, el, popper, settings)

    let listeners = []

    trigger.trim().split(' ').forEach(event =>
      listeners = listeners.concat(createTrigger(event, el, handlers, touchHold))
    )

    a.push({
      id,
      el,
      popper,
      settings,
      listeners,
      tippyInstance: this
    })

    idCounter++

    return a
  }, [])
}