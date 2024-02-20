function runtimeListener(translator) {
  browser?.runtime.onMessage.addListener(async ({ action, args }) => {
    switch (action) {
      case MSG_TRANS_TOGGLE:
        translator.toggle();
        sendIframeMsg(MSG_TRANS_TOGGLE);
        break;
      case MSG_TRANS_TOGGLE_STYLE:
        translator.toggleStyle();
        sendIframeMsg(MSG_TRANS_TOGGLE_STYLE);
        break;
      case MSG_TRANS_GETRULE:
        break;
      case MSG_TRANS_PUTRULE:
        translator.updateRule(args);
        sendIframeMsg(MSG_TRANS_PUTRULE, args);
        break;
      case MSG_OPEN_TRANBOX:
        window.dispatchEvent(new CustomEvent(MSG_OPEN_TRANBOX));
        break;
      default:
        return { error: `message action is unavailable: ${action}` };
    }
    return { data: translator.rule };
  });
}