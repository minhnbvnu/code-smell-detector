function canvas_mouseup(evt)
{
	if(!waterfall_setup_done) return;
	relativeX=(evt.offsetX)?evt.offsetX:evt.layerX;

	if(!canvas_drag)
	{
		//ws.send("SET offset_freq="+canvas_get_freq_offset(relativeX).toString());
		demodulator_set_offset_frequency(0, canvas_get_freq_offset(relativeX));
		e("webrx-actual-freq").innerHTML=format_frequency("{x} MHz",canvas_get_frequency(relativeX),1e6,4);
	}
	else
	{
		canvas_end_drag();
	}
	canvas_mouse_down=false;
}