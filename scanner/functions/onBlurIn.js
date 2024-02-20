function onBlurIn(e) {
    // remove event listener from so they don't stack
    e.target.removeEventListener("blur", onBlurIn)

    // if this timer runs out before a new element is focused, refocus same element
    // if (!isMobile) focusTimeOutID = setTimeout(() => active.focus(), 100)
}