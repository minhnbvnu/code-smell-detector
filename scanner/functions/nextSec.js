function nextSec(updatepv)
{
  $(currentSlide).find('video').each(function() {
    console.log('Pausing videos on ' + currentSlide.attr('id'))
    $(this).get(0).pause();
  });

  var curSec = currentSlide.attr('data-section');
  var nextSec = $('li:has(a.navSection:contains('+curSec+'))')
        .next('li').find('ul li a:first').attr('rel');
  gotoSlide(nextSec);
  track();
}