function __getBorderWidth(element)
{
	var res = new Object();
	res.left = 0; res.top = 0; res.right = 0; res.bottom = 0;
	if (Mandreel_window.getComputedStyle)
	{
		//for Firefox
		var elStyle = Mandreel_window.getComputedStyle(element, null);
		res.left = parseInt(elStyle.borderLeftWidth.slice(0, -2));
		res.top = parseInt(elStyle.borderTopWidth.slice(0, -2));
		res.right = parseInt(elStyle.borderRightWidth.slice(0, -2));
		res.bottom = parseInt(elStyle.borderBottomWidth.slice(0, -2));
	}
	else
	{
		//for other browsers
		res.left = __parseBorderWidth(element.style.borderLeftWidth);
		res.top = __parseBorderWidth(element.style.borderTopWidth);
		res.right = __parseBorderWidth(element.style.borderRightWidth);
		res.bottom = __parseBorderWidth(element.style.borderBottomWidth);
	}
	return res;
}