function scale_canvas_mousedown(evt)
{
	with(scale_canvas_drag_params)
	{
		mouse_down=true;
		drag=false;
		start_x=evt.pageX;
		key_modifiers.shiftKey=evt.shiftKey;
		key_modifiers.altKey=evt.altKey;
		key_modifiers.ctrlKey=evt.ctrlKey;
	}
	evt.preventDefault();
}