function increment() {
  showIncremental(incrCurr);

  var incrEvent = jQuery.Event("showoff:incr");
  incrEvent.slidenum = slidenum;
  incrEvent.incr = incrCurr;
  $(currentSlide).find(".content").trigger(incrEvent);

  incrCurr++;
}