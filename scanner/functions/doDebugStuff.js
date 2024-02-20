function doDebugStuff()
{
	if (debugMode) {
	  $('#debugInfo').show();
		$('#slideFilename').show();
	} else {
	  $('#debugInfo').hide();
		$('#slideFilename').hide();
	}
}