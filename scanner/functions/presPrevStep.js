function presPrevStep()
{
  prevStep();
  try { slaveWindow.prevStep(false) } catch (e) {};
  try { nextWindow.gotoSlide(nextSlideNum()) } catch (e) {};
  postSlide();

  update();
}