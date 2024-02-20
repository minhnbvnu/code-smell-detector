function mandreel_flash_sockets_getFlashMovieObject(movieName)
{
	if (Mandreel_window.document[movieName])
	{
		return Mandreel_window.document[movieName];
	}
	if (navigator.appName.indexOf("Microsoft Internet")==-1)
	{
		if (document.embeds && document.embeds[movieName])
			return document.embeds[movieName];
	}
	else
	{
		return document.getElementById(movieName);
	}
}