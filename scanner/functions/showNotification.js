function showNotification(whr, msg) {
    jquery(whr).find('*').addClass('template');
    jquery(whr).find(msg).removeClass('template');
  }