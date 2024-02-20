function format_frequency(format, freq_hz, pre_divide, decimals)
{
	out=format.replace("{x}",(freq_hz/pre_divide).toFixed(decimals));
	at=out.indexOf(".")+4;
	while(decimals>3)
	{
		out=out.substr(0,at)+","+out.substr(at);
		at+=4;
		decimals-=3;
	}
	return out;
}