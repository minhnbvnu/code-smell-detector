function applyColors()
{
	if ( !colorbrewer[selectedScheme][numClasses] ) var mug = 0; // show some message
	for ( var i = 0; i < numClasses; i++ ){
		if ( !$("#borderscheck").is(":checked") ) $("#county-map g .q"+i+"-"+numClasses).css("stroke",colorbrewer[selectedScheme][numClasses][i]);
		$(".q"+i+"-"+numClasses).css("fill",colorbrewer[selectedScheme][numClasses][i]);
	}
}