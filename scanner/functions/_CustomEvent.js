function _CustomEvent (_event, _params) {
    const params = {...DEFAULT_PARAMS, ..._params}
    const event = document.createEvent(`CustomEvent`)

    event.initCustomEvent(_event, params.bubbles, params.cancelable, params.detail)
    return event
  }