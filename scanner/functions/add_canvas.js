function add_canvas()
{
	var new_canvas = document.createElement("canvas");
	new_canvas.width=fft_size;
	new_canvas.height=canvas_default_height;
	canvas_actual_line=canvas_default_height-1;
	new_canvas.style.width=(canvas_container.clientWidth*zoom_levels[zoom_level]).toString()+"px";
	new_canvas.style.left=zoom_offset_px.toString()+"px";
	new_canvas.style.height=canvas_default_height.toString()+"px";
	new_canvas.openwebrx_top=(-canvas_default_height+1);
	new_canvas.style.top=new_canvas.openwebrx_top.toString()+"px";
	canvas_context = new_canvas.getContext("2d");
	canvas_container.appendChild(new_canvas);
	new_canvas.addEventListener("mouseover", canvas_mouseover, false);
	new_canvas.addEventListener("mouseout", canvas_mouseout, false);
	new_canvas.addEventListener("mousemove", canvas_mousemove, false);
	new_canvas.addEventListener("mouseup", canvas_mouseup, false);
	new_canvas.addEventListener("mousedown", canvas_mousedown, false);
	new_canvas.addEventListener("wheel",canvas_mousewheel, false);
	canvases.push(new_canvas);
}