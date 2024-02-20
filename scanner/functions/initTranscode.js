function initTranscode()
{
	$("#progressbar").progressbar({
		value: false,
		change: function() {
			console.log("[Progress change]");
			$(".progress-label").text($("#progressbar").progressbar( "value" ) + "%" );
		}
	});

	$("#progressbar").hide();
	$("#progressbar").progressbar("value", 0);
}