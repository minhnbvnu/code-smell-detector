function reloadSlides (hard) {
  if(hard) {
    var message = I18n.t('reload');
  }
  else {
    var message = I18n.t('refresh');
  }

  if (confirm(message)) {
    loadSlides(loadSlidesBool, true, hard);
  }
}