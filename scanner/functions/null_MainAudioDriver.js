function null_MainAudioDriver()
{
	mandreel_audio_init = null_mandreel_audio;
	mandreel_audio_end = null_mandreel_audio;
	mandreel_audio_update = null_mandreel_audio;
	mandreel_audio_createBuffer = null_mandreel_audio;
	mandreel_audio_playChannel = null_mandreel_audio;
	mandreel_audio_stopChannel = null_mandreel_audio;
	mandreel_audio_setChannelVolume = null_mandreel_audio;
	mandreel_audio_setChannelPan = null_mandreel_audio;
	mandreel_audio_setChannelPitch = null_mandreel_audio;
	mandreel_audio_useMusicFunctions = wa_mandreel_audio_useMusicFunctions;
	mandreel_audio_playMusic = wa_mandreel_audio_playMusic;
	mandreel_audio_stopMusic = wa_mandreel_audio_stopMusic;
	mandreel_audio_setMusicVol = wa_mandreel_audio_setMusicVol;
	setTimeout("MandreelAudioStarted()", 10);
}