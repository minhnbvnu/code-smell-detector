function _subscribeToRenderEvents() {
  subscribe('render', {
    before(name, timestamp, payload) {
      const info = {
        type: 'began',
        timestamp,
        payload,
        now: Date.now(),
      };
      return profileManager.addToQueue(info);
    },

    after(name, timestamp, payload, beganIndex) {
      const endedInfo = {
        type: 'ended',
        timestamp,
        payload,
      };

      const index = profileManager.addToQueue(endedInfo);
      profileManager.queue[beganIndex].endedIndex = index;
    },
  });
}