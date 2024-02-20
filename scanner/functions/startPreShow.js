function startPreShow() {
  nextPreShowImage();

  var nextImage = secondsFromNow(preshow_secondsPer);
  var interval  = setInterval(function() {
    var now = new Date();

    if (now > preshow_stop) {
      clearInterval(interval);
      stopPreShow();
    } else {
      if (now > nextImage) {
        nextImage = secondsFromNow(preshow_secondsPer);
        nextPreShowImage();
      }
      var secondsLeft = Math.floor((preshow_stop.getTime() - now.getTime()) / 1000);
      addPreShowTips(secondsLeft);
    }
  }, 1000)
}