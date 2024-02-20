function audio_onprocess(e)
{
	//console.log("audio onprocess");
	if(audio_buffering) return;
	if(audio_prepared_buffers.length==0) { audio_buffer_progressbar_update(); /*add_problem("audio underrun");*/ audio_buffering=true; }
	else { e.outputBuffer.copyToChannel(audio_prepared_buffers.shift(),0); }
}