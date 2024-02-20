function MandreelInterSwfCheckMethod(method)
{
	if (typeof(Mandreel_window[method])=="undefined")
		return 0;
	else
		return 1;
}