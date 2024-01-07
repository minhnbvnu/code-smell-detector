function createFauxWorker(config, onMessage) {
  const minion = createMinion(config.operation);
  let terminated = false;
  return {
    postMessage: function (data) {
      setTimeout(function () {
        if (terminated) {
          return;
        }
        onMessage({data: {buffer: minion(data), meta: data['meta']}});
      }, 0);
    },
    terminate: function () {
      terminated = true;
    },
  };
}