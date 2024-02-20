function __getOperaVersion()
{
	var rv = 0; // Default value
	if (Mandreel_window.opera)
	{
		var sver = Mandreel_window.opera.version();
		rv = parseFloat(sver);
	}
	return rv;
}