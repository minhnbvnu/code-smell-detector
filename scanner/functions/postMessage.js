function postMessage(msg, data) {
  const reqId = Math.random().toString(HASH_RADIX).replace(/[^a-z]+/g, '');

  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      window.removeEventListener('mozL20nDemoResponse', onResponse);
      reject();
    }, MOZ_EVENT_TIMEOUT);

    window.addEventListener('mozL20nDemoResponse', onResponse);

    emit(msg, reqId, data);

    function onResponse(evt) {
      if (evt.detail.requestId === reqId) {
        clearTimeout(t);
        window.removeEventListener('mozL20nDemoResponse', onResponse);
        resolve(evt.detail.data);
      }
    }
  });
}