function presNextSec()
{
  nextSec();
  try { slaveWindow.nextSec(false) } catch (e) {};
  try { nextWindow.gotoSlide(nextSlideNum()) } catch (e) {};
  postSlide();

  update();
}