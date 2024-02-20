function scale_setup()
{
	e("webrx-actual-freq").innerHTML=format_frequency("{x} MHz",canvas_get_frequency(window.innerWidth/2),1e6,4);
	scale_canvas=e("openwebrx-scale-canvas");
	scale_ctx=scale_canvas.getContext("2d");
	scale_canvas.addEventListener("mousedown", scale_canvas_mousedown, false);
	scale_canvas.addEventListener("mousemove", scale_canvas_mousemove, false);
	scale_canvas.addEventListener("mouseup", scale_canvas_mouseup, false);
	resize_scale();
}