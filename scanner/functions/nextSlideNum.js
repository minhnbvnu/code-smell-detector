function nextSlideNum(url) {
  // Some fudging because the first slide is slide[0] but numbered 1 in the URL
  var snum;
  if (typeof(url) == 'undefined') { snum = currentSlideFromParams()+1; }
  else { snum = currentSlideFromParams()+2; }
  return snum;
}