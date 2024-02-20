function notifySubscription(subscription, type, value) {
  subscription._state = 'running';

  let observer = subscription._observer;

  try {
    let m = getMethod(observer, type);
    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;
      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);
        else throw value;
        break;
      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed')
    cleanupSubscription(subscription);
  else if (subscription._state === 'running')
    subscription._state = 'ready';
}