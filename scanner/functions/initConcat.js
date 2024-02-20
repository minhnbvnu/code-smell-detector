function initConcat()
{
	$("#progressbar").progressbar({
		value: false,
		change: function() {
			console.log("[Progress change]");
			$(".progress-label").text($("#progressbar").progressbar( "value" ) + "%" );
		}
	});
    
    $("#sourcePath1").focusin(function(){        
        input_focus_id = 'sourcePath1';
    });
        
    $("#sourcePath2").focusin(function(){        
        input_focus_id = 'sourcePath2';
    });   
    
    $("input[type=text]").focusin(function(){        
        if (this.id != 'sourcePath1' && this.id != 'sourcePath2')
        {
            input_focus_id = '';
        }
    });  

	$("#progressbar").hide();
	$("#progressbar").progressbar("value", 0);
}