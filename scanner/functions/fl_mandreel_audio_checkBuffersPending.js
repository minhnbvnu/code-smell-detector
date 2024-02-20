function fl_mandreel_audio_checkBuffersPending(sp)
{
	r_g0 = 0;
	if ( fl_internal_mandreel_audio_checkBuffersPending() )
		r_g0 = 1;
	dump("fl_mandreel_audio_checkBuffersPending ("+r_g0+") ("+mandreel_audio_flash_lastBufferCreatedSwf+") ("+mandreel_audio_flash_lastBufferCreated+")");
}