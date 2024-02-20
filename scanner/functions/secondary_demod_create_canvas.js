function secondary_demod_create_canvas()
{
	var new_canvas = document.createElement("canvas");
	new_canvas.width=secondary_fft_size;
	new_canvas.height=$(secondary_demod_canvas_container).height();
	new_canvas.style.width=$(secondary_demod_canvas_container).width()+"px";
	new_canvas.style.height=$(secondary_demod_canvas_container).height()+"px";
    console.log(new_canvas.width, new_canvas.height, new_canvas.style.width, new_canvas.style.height);
	secondary_demod_current_canvas_actual_line=new_canvas.height-1;
	$(secondary_demod_canvas_container).children().last().before(new_canvas);
    return new_canvas;
}