function wa_imp_mandreel_audio_checkBuffersPending()
{
	return wa_mandreel_audio_buffers_num - wa_mandreel_audio_buffers_loaded;
}