function at_MainAudioDriver()
{
	mandreel_audio_init = at_mandreel_audio_init;
	mandreel_audio_end = at_mandreel_audio_end;
	mandreel_audio_update = at_mandreel_audio_update;
	mandreel_audio_createBuffer = at_mandreel_audio_createBuffer;
	mandreel_audio_playChannel = at_mandreel_audio_playChannel;
	mandreel_audio_stopChannel = at_mandreel_audio_stopChannel;
	mandreel_audio_setChannelVolume = at_mandreel_audio_setChannelVolume;
	mandreel_audio_setChannelPan = at_mandreel_audio_setChannelPan;
	mandreel_audio_setChannelPitch = at_mandreel_audio_setChannelPitch;
	mandreel_audio_useMusicFunctions = at_mandreel_audio_useMusicFunctions;
	mandreel_audio_playMusic = wa_mandreel_audio_playMusic;
	mandreel_audio_stopMusic = wa_mandreel_audio_stopMusic;
	mandreel_audio_checkBuffersPending = at_mandreel_audio_checkBuffersPending;
	mandreel_audio_setMusicVol = wa_mandreel_audio_setMusicVol;

	setTimeout("mandreel_audiotag_PreloadAssets()", 10);
}