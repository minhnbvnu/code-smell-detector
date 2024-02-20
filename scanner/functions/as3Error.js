function as3Error(str)
{
	var params = str.split(' ');
	if ( params[0] == "createdBuffer" )
		mandreel_audio_flash_lastBufferCreatedSwf = parseInt(params[1]);
	dump("as3Log: "+str);
}