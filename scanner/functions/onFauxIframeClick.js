function onFauxIframeClick({ el, event, handler, middleware }) {
  // Note: on firefox clicking on iframe triggers blur, but only on
  //       next event loop it becomes document.activeElement
  // https://stackoverflow.com/q/2381336#comment61192398_23231136
  setTimeout(() => {
    const { activeElement } = document
    if (
      activeElement &&
      activeElement.tagName === 'IFRAME' &&
      !el.contains(activeElement)
    ) {
      execHandler({ event, handler, middleware })
    }
  }, 0)
}