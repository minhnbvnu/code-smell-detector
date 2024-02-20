function simulateEvent(type, config = {}, node = window) {
  let evt = new Event(type);

  for (let prop in config) {
    evt[prop] = config[prop];
  }

  if (config.async) {
    window.setTimeout(() => node.dispatchEvent(evt), 100);
  } else {
    node.dispatchEvent(evt);
  }

  return evt;
}