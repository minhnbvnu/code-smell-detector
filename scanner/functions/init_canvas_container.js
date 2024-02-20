function init_canvas_container()
{
	canvas_container=e("webrx-canvas-container");
	mathbox_container=e("openwebrx-mathbox-container");
	canvas_container.addEventListener("mouseout",canvas_container_mouseout, false);
	//window.addEventListener("mouseout",window_mouseout,false);
	//document.body.addEventListener("mouseup",body_mouseup,false);
	canvas_phantom=e("openwebrx-phantom-canvas");
	canvas_phantom.addEventListener("mouseover", canvas_mouseover, false);
	canvas_phantom.addEventListener("mouseout", canvas_mouseout, false);
	canvas_phantom.addEventListener("mousemove", canvas_mousemove, false);
	canvas_phantom.addEventListener("mouseup", canvas_mouseup, false);
	canvas_phantom.addEventListener("mousedown", canvas_mousedown, false);
	canvas_phantom.addEventListener("wheel",canvas_mousewheel, false);
	canvas_phantom.style.width=canvas_container.clientWidth+"px";
	add_canvas();
}