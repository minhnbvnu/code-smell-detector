function fl_internal_mandreel_audio_checkBuffersPending()
{
	return mandreel_flashaudio_lite && (mandreel_audio_flash_lastBufferCreatedSwf != mandreel_audio_flash_lastBufferCreated);
}