function checkFilters(scheme,f)
{
	if ( !colorbrewer[scheme][numClasses] ) return false;
	if ( $("#blindcheck").is(":checked") && checkColorblind(scheme) != 1 ) return false;
	if ( $("#printcheck").is(":checked") && checkPrint(scheme) != 1 ) return false;
	if ( $("#copycheck").is(":checked") && checkCopy(scheme) != 1) return false;
	return true;
}