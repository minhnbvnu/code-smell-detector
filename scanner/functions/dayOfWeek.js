function dayOfWeek(year, month, day) {
    var js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
    return js === 0 ? 7 : js;
  }