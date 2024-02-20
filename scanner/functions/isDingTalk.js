function isDingTalk() {
  try {
    return dd && dd.getSystemInfoSync() || /DingTalk/i.test(window.navigator.userAgent);
  } catch (err) {
    return false;
  }
}