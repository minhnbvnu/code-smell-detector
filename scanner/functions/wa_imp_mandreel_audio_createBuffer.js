function wa_imp_mandreel_audio_createBuffer(fileName)
{
	if ( webAudioContext )
	{
		var fileNameNoExt = wa_getFileNameNoExt(fileName);
		var buffer = webAudioBuffers[fileNameNoExt];
		if ( buffer == null && buffer != "invalid" )
		{
			wa_mandreel_audio_buffers_num++;
			mandreel_webAudio_queueLoadBuffer(fileName, function () {wa_mandreel_audio_buffers_loaded++;});
		}
	}
}