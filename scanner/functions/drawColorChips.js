function drawColorChips()
{
	var svg = "<svg width='25' height='200' class='"+selectedScheme+" q"+numClasses+"'>";
	for ( var i = 0; i < numClasses; i++ ){
		svg += "<rect fill="+colorbrewer[selectedScheme][numClasses][i]+" width='25' height='"+Math.min(25,parseInt(200/numClasses))+"' y='"+i*Math.min(25,parseInt(200/numClasses))+"'/>";
	}
	$("#color-chips").empty().append(svg);
	updateValues();
}