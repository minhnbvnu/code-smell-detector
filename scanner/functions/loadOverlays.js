function loadOverlays(o)
{
	$("#overlays").svg({
		loadURL: "overlays.svg",
		onLoad: function(){
			$("#overlays svg").attr("width","100%").attr("height","100%");
			if ( o == "cities" ) $("#roads").hide();
			else $("#cities").hide();
			$("#cities").css("fill",$("#city-color").spectrum("get").toHexString());
			$("#road-lines").css("stroke",$("#road-color").spectrum("get").toHexString());
		}
	});
}