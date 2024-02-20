function presNextStep()
{
  nextStep();
	try { slaveWindow.nextStep(false) } catch (e) {};
  try { nextWindow.gotoSlide(nextSlideNum()) } catch (e) {};
	postSlide();

	update();
}