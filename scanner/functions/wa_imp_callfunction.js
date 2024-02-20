function wa_imp_callfunction(params)
{
	if ( params[0] == "#MandreelAudio" )
	{
		if ( params[1] == "playChannel" )
			wa_imp_mandreel_audio_playChannel(params[2],params[3],params[4],params[5],params[6],params[7]);
		else if ( params[1] == "stopChannel" )
			wa_imp_mandreel_audio_stopChannel(params[2]);
		else if ( params[1] == "setChannelVol" )
			wa_imp_mandreel_audio_setChannelVol(params[2],params[3]);
		else if ( params[1] == "setChannelPan" )
			wa_imp_mandreel_audio_setChannelPan(params[2],params[3]);
		else if ( params[1] == "playMusic" )
			wa_imp_mandreel_audio_playMusic(params[2]);
		else if ( params[1] == "stopMusic" )
			wa_imp_mandreel_audio_stopMusic(params[2]);
		else if ( params[1] == "setMusicVol" )
			wa_imp_mandreel_audio_setMusicVol(params[2]);

		return true;
	}
	return false;
}