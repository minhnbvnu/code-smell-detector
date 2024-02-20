function showSchemes()
{
	$("#ramps").empty();
	for ( var i in schemeNames[selectedSchemeType]){
		if ( checkFilters(schemeNames[selectedSchemeType][i]) == false ) continue;
		var ramp = $("<div class='ramp "+schemeNames[selectedSchemeType][i]+"'></div>"),
			svg = "<svg width='15' height='75'>";
		for ( var n = 0; n < 5; n++ ){
			svg += "<rect fill="+colorbrewer[schemeNames[selectedSchemeType][i]][5][n]+" width='15' height='15' y='"+n*15+"'/>";
		}
		svg += "</svg>";
		$("#ramps").append(ramp.append(svg).click( function(){
			if ( $(this).hasClass("selected") ) return;
			setScheme( $(this).attr("class").substr(5) );
		}));
	}
	if ( selectedSchemeType == "sequential" ){
		$("#scheme1").css("width","160px");
		$("#multi").show().text("Multi-hue:");
		$("#scheme2").css("width","90px");
		$("#single").show().text("Single hue:");

		$("#singlehue").empty().css("display","inline-block");
		for ( i in schemeNames.singlehue){
			if ( checkFilters(schemeNames.singlehue[i]) == false ) continue;
			var ramp = $("<div class='ramp "+schemeNames.singlehue[i]+"'></div>"),
				svg = "<svg width='15' height='75'>";
			for ( var n = 0; n < 5; n++ ){
				svg += "<rect fill="+colorbrewer[schemeNames.singlehue[i]][5][n]+" width='15' height='15' y='"+n*15+"'/>";
			}
			svg += "</svg>";
			$("#singlehue").append(ramp.append(svg).click( function(){
				if ( $(this).hasClass("selected") ) return;
				setScheme( $(this).attr("class").substr(5) );
			}));
		}
	} else {
		$("#scheme1").css("width","100%");
		$("#multi").hide();
		$("#singlehue").empty();
		$("#single").hide();
	}

	$(".score-icon").show();
	$("#color-system").show();
	if ( $(".ramp."+selectedScheme)[0] ){
		setScheme( selectedScheme );
	} else if ( $("#ramps").children().length ) setScheme( $("#ramps .ramp:first-child").attr("class").substr(5) );
	else clearSchemes();
}