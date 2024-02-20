function fl_map_mandreel_audio_functions()
{
	mandreel_audio_init = fl_mandreel_audio_init;
	mandreel_audio_end = fl_mandreel_audio_end;
	mandreel_audio_update = fl_mandreel_audio_update;
	mandreel_audio_createBuffer = fl_mandreel_audio_createBuffer;
	mandreel_audio_playChannel = fl_mandreel_audio_playChannel;
	mandreel_audio_stopChannel = fl_mandreel_audio_stopChannel;
	mandreel_audio_setChannelVolume = fl_mandreel_audio_setChannelVolume;
	mandreel_audio_setChannelPan = fl_mandreel_audio_setChannelPan;
	mandreel_audio_setChannelPitch = fl_mandreel_audio_setChannelPitch;
	if ( mandreel_flashaudio_musicaudiotag )
	{
		mandreel_audio_useMusicFunctions = wa_mandreel_audio_useMusicFunctions;
		mandreel_audio_playMusic = wa_mandreel_audio_playMusic;
		mandreel_audio_stopMusic = wa_mandreel_audio_stopMusic;
		mandreel_audio_setMusicVol = wa_mandreel_audio_setMusicVol;
	}
	else
		dump("WARNING: flash music functions not supported");
	mandreel_audio_checkBuffersPending = fl_mandreel_audio_checkBuffersPending;
}