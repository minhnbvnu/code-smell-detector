async function triggerPort(app, ...args) {
  run(() => app.owner.lookup('service:port').trigger(...args));
  await settled();
}