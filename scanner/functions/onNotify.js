function onNotify(subscription, type, value) {
  if (subscription._state === 'closed')
    return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({ type, value });
    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{ type, value }];
    enqueue(() => flushSubscription(subscription));
    return;
  }

  notifySubscription(subscription, type, value);
}