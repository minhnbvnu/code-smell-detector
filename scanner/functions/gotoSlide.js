function gotoSlide(slideNum, updatepv) {
  var newslide = parseInt(slideNum);
  if (slidenum != newslide && !isNaN(newslide)) {
    var back = (newslide == (slidenum - 1))
    slidenum = newslide;
    showSlide(back, updatepv);
  }
}