function checkScreen(scheme)
{
	return colorbrewer[scheme].properties.screen.length > 1 ? colorbrewer[scheme].properties.screen[numClasses-3] : colorbrewer[scheme].properties.screen[0];
}