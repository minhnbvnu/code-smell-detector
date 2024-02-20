function scale_canvas_end_drag(x)
{
	canvas_container.style.cursor="default";
	scale_canvas_drag_params.drag=false;
	scale_canvas_drag_params.mouse_down=false;
	var event_handled=false;
	for (var i=0;i<demodulators.length;i++) event_handled|=demodulators[i].envelope.drag_end(x);
	//console.log(event_handled);
	if (!event_handled) demodulator_set_offset_frequency(0,scale_offset_freq_from_px(x));
}