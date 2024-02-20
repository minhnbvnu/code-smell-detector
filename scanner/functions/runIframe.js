function runIframe(setting) {
  let translator;
  window.addEventListener("message", (e) => {
    const { action, args } = e.data || {};
    switch (action) {
      case MSG_TRANS_TOGGLE:
        translator?.toggle();
        break;
      case MSG_TRANS_TOGGLE_STYLE:
        translator?.toggleStyle();
        break;
      case MSG_TRANS_PUTRULE:
        if (!translator) {
          translator = new Translator(args, setting);
        } else {
          translator.updateRule(args || {});
        }
        break;
      default:
    }
  });
  sendParentMsg(MSG_TRANS_GETRULE);
}