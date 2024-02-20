function concatToDst()
{
	$("#result" ).text("");

	if (concatEnabled == true)
	{
        $("#progressbar").progressbar("value", 0);
        var sourcePath1 = $("#sourcePath1").val();
        var startTime1 = $("#startTime1").val();
        var duration1 = $("#duration1").val();
        var frameRate1 = $("#frameRate1").val();
        var sourcePath2 = $("#sourcePath2").val();
        var startTime2 = $("#startTime2").val();
        var duration2 = $("#duration2").val();
        var frameRate2 = $("#frameRate2").val();
        var outputDirectory = $("#outputDirectory").val();
        var presetPath = $("#presetPath").val();
        var outputFilename = $("#outputFilename").val();
		var outputXMP = $('input[type="radio"][name="outputXMP"]:checked').val();
        console.log("[Preset path]:%s", presetPath);
        var error = false;
        $("#startConcat").attr("disabled", "disabled");
        concatEnabled = false;
        
        if (sourcePath1 == "")
        {
            $("#sourcePath1").toggle( "highlight" );
            $("#sourcePath1").toggle( "highlight" );
            error = true;
        }
    
        if (startTime1 == "")
        {
            $("#startTime1").toggle( "highlight" );
            $("#startTime1").toggle( "highlight" );
            error = true;
        }
        
        if (duration1 == "")
        {
            $("#duration1").toggle( "highlight" );
            $("#duration1").toggle( "highlight" );
            error = true;
        }
    
        if (frameRate1 == "")
        {
            $("#frameRate1").toggle( "highlight" );
            $("#frameRate1").toggle( "highlight" );
            error = true;
        }
            
        if (sourcePath2 == "")
        {
            $("#sourcePath2").toggle( "highlight" );
            $("#sourcePath2").toggle( "highlight" );
            error = true;
        }
    
        if (startTime2 == "")
        {
            $("#startTime2").toggle( "highlight" );
            $("#startTime2").toggle( "highlight" );
            error = true;
        }
        
        if (duration2 == "")
        {
            $("#duration2").toggle( "highlight" );
            $("#duration2").toggle( "highlight" );
            error = true;
        }
    
        if (frameRate2 == "")
        {
            $("#frameRate2").toggle( "highlight" );
            $("#frameRate2").toggle( "highlight" );
            error = true;
        }
        
        if (error == true)
        {
            $("#startConcat").attr("disabled", "disabled");
            $("#progressbar" ).hide();
            concatEnabled = true;
            return;
        }
        
        $("#progressbar" ).show();
        
        var event = new CSEvent("com.adobe.browser.event.ConcatenationRequest", "APPLICATION");
        taskID = newGuid();
        var msgID = newGuid();  
        
        var messageXML = '<browserMessage><browserID ID="EABROWSER_SOURCE"/><taskID ID="'+taskID+'"/><msgID ID="'+msgID+'"/><presetPath>'+presetPath+'</presetPath><outputDirectory path="'+outputDirectory+'"/><outputFileName>'+outputFilename+'</outputFileName><outputXMP>' + outputXMP + '</outputXMP><concatenationItemList><concatenationItem order="2"><filePath path="'+sourcePath2+'"/><frameRate>'+frameRate2+'</frameRate><startTime>'+startTime2+'</startTime><duration>'+duration2+'</duration></concatenationItem><concatenationItem order="1"><filePath path="'+sourcePath1+'"/><frameRate>'+frameRate1+'</frameRate><startTime>'+startTime1+'</startTime><duration>'+duration1+'</duration></concatenationItem></concatenationItemList></browserMessage>';
        
        console.log("[Send message to browser to start concat]:%s", messageXML);
        event.data = messageXML;
        csInterface.dispatchEvent(event);
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
	}
    else
    {
        // do something such as providing a prompt
    }

}