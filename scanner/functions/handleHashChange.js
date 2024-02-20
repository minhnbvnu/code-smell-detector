function handleHashChange(router) {
  set(router, 'hashPath', window.location.hash, {
    hashEvent: true
  });
}