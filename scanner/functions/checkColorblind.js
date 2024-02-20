function checkColorblind(scheme)
{
	return colorbrewer[scheme].properties.blind.length > 1 ? colorbrewer[scheme].properties.blind[numClasses-3] : colorbrewer[scheme].properties.blind[0];
}