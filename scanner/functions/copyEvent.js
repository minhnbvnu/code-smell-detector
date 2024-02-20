function copyEvent(e) {
    var bubbles = e.bubbles,
      cancelable = e.cancelable,
      detail = e.detail,
      type = e.type;
    if ('detail' in e) {
      // @ts-expect-error Casting doesn't work
      return new ShimCustomEvent(type, {
        bubbles: bubbles,
        cancelable: cancelable,
        detail: detail
      }, e);
    }
    // @ts-expect-error Casting doesn't work
    return new ShimEvent(type, {
      bubbles: bubbles,
      cancelable: cancelable
    }, e);
  }