function triggerMessageDelayed(messageDelayed) {
  return {
    type: actions.TRIGGER_MESSAGE_DELAY,
    messageDelayed
  };
}