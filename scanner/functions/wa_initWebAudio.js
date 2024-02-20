function wa_initWebAudio()
{
	if ( preCreatedWebAudioContext != null )
	{
		webAudioContext = preCreatedWebAudioContext;
	}
	else
	{
		try	{ webAudioContext = new webkitAudioContext(); } catch(err) { webAudioContext = 0; }
	}
}