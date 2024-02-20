function scale_canvas_mousemove(evt)
{
	var event_handled;
	if(scale_canvas_drag_params.mouse_down&&!scale_canvas_drag_params.drag&&Math.abs(evt.pageX-scale_canvas_drag_params.start_x)>canvas_drag_min_delta)
	//we can use the main drag_min_delta thing of the main canvas
	{
		scale_canvas_drag_params.drag=true;
		//call the drag_start for all demodulators (and they will decide if they're dragged, based on X coordinate)
		for (var i=0;i<demodulators.length;i++) event_handled|=demodulators[i].envelope.drag_start(evt.pageX,scale_canvas_drag_params.key_modifiers);
		scale_canvas.style.cursor="move";
	}
	else if(scale_canvas_drag_params.drag)
	{
		//call the drag_move for all demodulators (and they will decide if they're dragged)
		for (var i=0;i<demodulators.length;i++) event_handled|=demodulators[i].envelope.drag_move(evt.pageX);
		if (!event_handled) demodulator_set_offset_frequency(0,scale_offset_freq_from_px(evt.pageX));
	}

}