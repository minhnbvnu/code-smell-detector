function updateSquelch()
{
	var sliderValue=parseInt(e("openwebrx-panel-squelch").value);
	var outputValue=(sliderValue==parseInt(e("openwebrx-panel-squelch").min))?0:getLinearSmeterValue(sliderValue);
	ws.send("SET squelch_level="+outputValue.toString());
}