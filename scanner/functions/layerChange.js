function layerChange()
{
	switch( $(this).attr("id") ){
		case "roadscheck":
		if ( $(this).is(":checked") ){
			if ( !$("#overlays").children().length )
				loadOverlays("roads");
			else
				$("#roads").show();
		} else {
			$("#roads").hide();
		}
		break;
		
		case "citiescheck":
		if ( $(this).is(":checked") ){
			if ( !$("#overlays").children().length )
				loadOverlays("cities");
			else
				$("#cities").show();
		} else {
			$("#cities").hide();
		}
		break;
		
		case "borderscheck":
		if ($(this).is(":checked")) $("#county-map g").children().css("stroke","inherit");
		else {
			var i=numClasses; while(i--){
				$("#county-map g .q"+i+"-"+numClasses).css("stroke",colorbrewer[selectedScheme][numClasses][i]);
			}
			//$("#county-map g").css("stroke","none");
		}
	}
}