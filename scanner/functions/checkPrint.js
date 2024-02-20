function checkPrint(scheme)
{
	return colorbrewer[scheme].properties.print.length > 1 ? colorbrewer[scheme].properties.print[numClasses-3] : colorbrewer[scheme].properties.print[0];
}