function at_mandreel_audio_update(sp)
{
	for ( i = 0 ; i < 32 ; ++i )
	{
		var end = maudioChannelEnd[i];
		if ( end != null )
		{
			var sound = maudiotagChannels[i];
			if ( sound != null )
			{
				if ( sound.currentTime > end )
				{
					sound.pause();
					maudioChannelEnd[i] = null;
				}
			}
		}
	}
}