function wa_MainAudioDriver()
{
	mandreel_audio_init = wa_mandreel_audio_init;
	mandreel_audio_end = wa_mandreel_audio_end;
	mandreel_audio_update = wa_mandreel_audio_update;
	mandreel_audio_createBuffer = wa_mandreel_audio_createBuffer;
	mandreel_audio_playChannel = wa_mandreel_audio_playChannel;
	mandreel_audio_stopChannel = wa_mandreel_audio_stopChannel;
	mandreel_audio_setChannelVolume = wa_mandreel_audio_setChannelVolume;
	mandreel_audio_setChannelPan = wa_mandreel_audio_setChannelPan;
	mandreel_audio_setChannelPitch = wa_mandreel_audio_setChannelPitch;
	mandreel_audio_useMusicFunctions = wa_mandreel_audio_useMusicFunctions;
	mandreel_audio_playMusic = wa_mandreel_audio_playMusic;
	mandreel_audio_stopMusic = wa_mandreel_audio_stopMusic;
	mandreel_audio_checkBuffersPending = wa_mandreel_audio_checkBuffersPending;
	mandreel_audio_setMusicVol = wa_mandreel_audio_setMusicVol;

	setTimeout("mandreel_webAudio_PreloadAssets()", 10);
}