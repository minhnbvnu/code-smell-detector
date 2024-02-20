function waterfall_dequeue()
{
	if(waterfall_queue.length) waterfall_add(waterfall_queue.shift());
	if(waterfall_queue.length>Math.max(fft_fps/2,20)) //in case of emergency
	{
		console.log("waterfall queue length:", waterfall_queue.length);
		add_problem("fft overflow");
		while(waterfall_queue.length) waterfall_add(waterfall_queue.shift());
	}
}