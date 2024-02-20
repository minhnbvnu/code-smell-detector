function waterfall_init()
{
	init_canvas_container();
	waterfall_timer = window.setInterval(()=>{waterfall_dequeue(); secondary_demod_waterfall_dequeue();},900/fft_fps);
	resize_waterfall_container(false); /* then */ resize_canvases();
	scale_setup();
	mkzoomlevels();
	waterfall_setup_done=1;
}