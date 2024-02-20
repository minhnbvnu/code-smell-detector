function subscribe (parent, child, onFulfillment, onRejection) {
    var _subscribers = parent._subscribers
    var length = _subscribers.length

    parent._onerror = null

    _subscribers[length] = child
    _subscribers[length + FULFILLED] = onFulfillment
    _subscribers[length + REJECTED] = onRejection

    if (length === 0 && parent._state) {
      asap(publish, parent)
    }
  }