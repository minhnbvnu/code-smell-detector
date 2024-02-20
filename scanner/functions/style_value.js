function style_value(of_what,which)
{
	if(of_what.currentStyle) return of_what.currentStyle[which];
	else if (window.getComputedStyle) return document.defaultView.getComputedStyle(of_what,null).getPropertyValue(which);
}