function setSchemeType(type)
{
	$("#ramps").empty();
	for ( var i in schemeNames[type]){
		var ramp = $("<div class='ramp "+schemeNames[type][i]+"'></div>"),
			svg = "<svg width='15' height='75'>";
		for ( var n = 0; n < 5; n++ ){
			svg += "<rect fill="+colorbrewer[schemeNames[type][i]][5][n]+" width='15' height='15' y='"+n*15+"'/>";
		}
		svg += "</svg>";
		$("#ramps").append(ramp.append(svg).click( function(){
			setScheme( $(this).attr("class").substr(5) );
		}));
	}
	if ( type == "sequential" ){
		$("#ramps").css("width","160px").append("<p>multihue</p>");
		$("#singlehue").empty().css("display","inline-block");
		for ( i in schemeNames.singlehue){
			var ramp = $("<div class='ramp "+schemeNames.singlehue[i]+"'></div>"),
				svg = "<svg width='15' height='75'>";
			for ( var n = 0; n < 5; n++ ){
				svg += "<rect fill="+colorbrewer[schemeNames.singlehue[i]][5][n]+" width='15' height='15' y='"+n*15+"'/>";
			}
			svg += "</svg>";
			$("#singlehue").append(ramp.append(svg).click( function(){
				setScheme( $(this).attr("class").substr(5) );
			}));
		}
		$("#singlehue").append("<p>single hue</p>");
	} else {
		$("#ramps").css("width","100%");
		$("#singlehue").hide();
	}
	setScheme(schemeNames[type][0]);
}