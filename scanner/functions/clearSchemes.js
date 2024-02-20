function clearSchemes()
{
	$("#counties g path").css("fill","#ccc");
	$("#color-chips").empty();
	$("#color-values").empty();
	$("#ramps").css("width","100%");
	$("#scheme-name").html("");
	$(".score-icon").hide();
	$("#color-system").hide();
	$("#ramps").append("<p>No color schemes match these criteria.</p><p>Please choose fewer data classes, a different data type, and/or fewer filtering options.</p>");
}