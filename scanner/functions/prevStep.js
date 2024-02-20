function prevStep(updatepv)
{
  $(currentSlide).find('video').each(function() {
    console.log('Pausing videos on ' + currentSlide.attr('id'))
    $(this).get(0).pause();
  });

  fireEvent("showoff:prev");
  track();
  slidenum--;
  return showSlide(true, updatepv); // We show the slide fully loaded
}