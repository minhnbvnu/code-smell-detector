function PolyfilledCustomEvent(eventName, {bubbles = false, cancelable = false, detail = null} = {}) {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent(eventName, bubbles, cancelable, detail);
  return event;
}