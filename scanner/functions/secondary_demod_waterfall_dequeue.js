function secondary_demod_waterfall_dequeue()
{
    if(!secondary_demod || !secondary_demod_canvases_initialized) return;
	if(secondary_demod_waterfall_queue.length) secondary_demod_waterfall_add(secondary_demod_waterfall_queue.shift());
	if(secondary_demod_waterfall_queue.length>Math.max(fft_fps/2,20)) //in case of fft overflow
	{
		console.log("secondary waterfall overflow, queue length:", secondary_demod_waterfall_queue.length);
		while(secondary_demod_waterfall_queue.length) secondary_demod_waterfall_add(secondary_demod_waterfall_queue.shift());
	}
}