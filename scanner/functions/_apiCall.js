function _apiCall (topic, command, additionalArgs) {
    return new Promise((resolve, reject) => {
      let cmd = {command: command, time: Date.now() / 1000 | 0, initiator: 'localApp'};
      if (topic === 'delta') {
        cmd = {'state': command};
      }
      if (additionalArgs) {
        cmd = Object.assign(cmd, additionalArgs);
      }
      client.publish(topic, JSON.stringify(cmd), function (e) {
        if (e) return reject(e);
        resolve({ok: null}); // for retro compatibility
      });
    });
  }