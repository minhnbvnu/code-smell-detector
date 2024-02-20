function mountPopper(data) {
  const {
    el,
    popper,
    settings: {
      appendTo,
      followCursor
    }
  } = data

  // Already on the DOM
  if (appendTo.contains(popper)) return

  appendTo.appendChild(popper)

  if (!data.popperInstance) {
    data.popperInstance = createPopperInstance(data)
  } else {
    data.popperInstance.update()
    if (!followCursor || Browser.touch) {
      data.popperInstance.enableEventListeners()
    }
  }

  // Since touch is determined dynamically, followCursor is set on mount
  if (followCursor && !Browser.touch) {
    el.addEventListener('mousemove', followCursorHandler)
    data.popperInstance.disableEventListeners()
  }
}