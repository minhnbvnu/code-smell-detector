function getMessageInstance(callback) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }
  _rc_notification_3_3_1_rc_notification_es.newInstance({
    prefixCls: message_prefixCls,
    transitionName: message_transitionName,
    style: {
      top: defaultTop
    },
    getContainer: message_getContainer,
    maxCount: maxCount
  }, function (instance) {
    if (messageInstance) {
      callback(messageInstance);
      return;
    }
    messageInstance = instance;
    callback(instance);
  });
}