function iosPlayButtonClick()
{
	//On iOS, we can only start audio from a click or touch event.
	audio_init();
	e("openwebrx-big-grey").style.opacity=0;
	window.setTimeout(function(){ e("openwebrx-big-grey").style.display="none"; },1100);
}