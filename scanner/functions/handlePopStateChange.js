function handlePopStateChange(router) {
  set(router, 'path', window.location.pathname, {
    popEvent: true
  });
}