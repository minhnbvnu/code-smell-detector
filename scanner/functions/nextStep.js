function nextStep(updatepv)
{
  $(currentSlide).find('video').each(function() {
    console.log('Pausing videos on ' + currentSlide.attr('id'))
    $(this).get(0).pause();
  });

  fireEvent("showoff:next");
  track();

  if (incrCurr >= incrSteps) {
    slidenum++;
    return showSlide(false, updatepv);
  } else {
    increment();
  }
}