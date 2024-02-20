function promisifyEvent(target, eventType) {
  return new Promise(res => {
    const resolver = ev => {
      target.removeEventListener(eventType, resolver);
      res(ev);
    };
    target.addEventListener(eventType, resolver);
  });
}