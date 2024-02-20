function presPrevSec()
{
  prevSec();
  try { slaveWindow.prevSec(false) } catch (e) {};
  try { nextWindow.gotoSlide(nextSlideNum()) } catch (e) {};
  postSlide();

  update();
}