function initTransfer()
{
	$( "#content" ).accordion({collapsible: true});
	$( "#destination" ).tabs({
		activate: function(event, ui)
		{
			if(ui.newPanel.selector == "#local")
		    {
		        $("#transferType").val("local");
		    }   
		    else if(ui.newPanel.selector == "#ftp")
		    {
		        $("#transferType").val("ftp");    
		    }
		    else
		    {
		        // do nothing		  
		    };
		}
	});

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