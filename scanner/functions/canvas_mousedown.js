function canvas_mousedown(evt)
{
	canvas_mouse_down=true;
	canvas_drag=false;
	canvas_drag_last_x=canvas_drag_start_x=evt.pageX;
	canvas_drag_last_y=canvas_drag_start_y=evt.pageY;
	evt.preventDefault(); //don't show text selection mouse pointer
}