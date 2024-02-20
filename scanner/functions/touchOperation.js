function touchOperation(translator) {
  const { touchTranslate = 2 } = translator.setting;
  if (touchTranslate === 0) {
    return;
  }

  const handleTap = debounce(() => {
    translator.toggle();
    sendIframeMsg(MSG_TRANS_TOGGLE);
  });
  touchTapListener(handleTap, touchTranslate);
}