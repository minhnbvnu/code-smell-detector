function secondary_demod_waterfall_add(data)
{
    if(!secondary_demod) return;
	var w=secondary_fft_size;

	//Add line to waterfall image
	var oneline_image = secondary_demod_current_canvas_context.createImageData(w,1);
	for(x=0;x<w;x++)
	{
		var color=waterfall_mkcolor(data[x]+secondary_demod_fft_offset_db);
		for(i=0;i<4;i++) oneline_image.data[x*4+i] = ((color>>>0)>>((3-i)*8))&0xff;
	}

	//Draw image
	secondary_demod_current_canvas_context.putImageData(oneline_image, 0, secondary_demod_current_canvas_actual_line--);
    secondary_demod_canvases.map((x)=>{x.openwebrx_top += 1;});
    secondary_demod_canvases_update_top();
	if(secondary_demod_current_canvas_actual_line<0) secondary_demod_swap_canvases();
}