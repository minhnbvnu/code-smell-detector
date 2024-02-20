function togglePreShow() {
  // The slave window updates this flag, which seems backwards except that the
  // slave determines when to finish preshow.
  if(preshow_stop) {
    try {
      slaveWindow.stopPreShow();
    }
    catch (e) {
      stopPreShow();
    }

  } else {
    var seconds = parseFloat(prompt(I18n.t('preshow.prompt')) * 60);

    try {
      slaveWindow.setupPreShow(seconds);
    }
    catch (e) {
      setupPreShow(seconds);
    }
  }
}