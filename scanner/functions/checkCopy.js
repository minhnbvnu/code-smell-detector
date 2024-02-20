function checkCopy(scheme)
{
	return colorbrewer[scheme].properties.copy.length > 1 ? colorbrewer[scheme].properties.copy[numClasses-3] : colorbrewer[scheme].properties.copy[0];
}