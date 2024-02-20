function setPrototypeOfCustomEvent() {
    // TODO: IDL needs but reported as slow!
    Object.setPrototypeOf(ShimCustomEvent, /** @type {object} */ShimEvent);
    // @ts-expect-error How to overcome?
    Object.setPrototypeOf(ShimCustomEvent.prototype, ShimEvent.prototype);
  }