function __parseBorderWidth(width)
{
	var res = 0;
	if (typeof(width) == "string" && width != null && width != "" )
	{
		var p = width.indexOf("px");
		if (p >= 0)
		{
			res = parseInt(width.substring(0, p));
		}
		else
		{
			//do not know how to calculate other values (such as 0.5em or 0.1cm) correctly now so just set the width to 1 pixel
			res = 1;
		}
	}
	return res;
}