function transcodeToDst()
{
	$("#result" ).text("");

	if (transcodeEnabled == true)
	{
        $("#progressbar").progressbar("value", 0);
        var sourcePath = $("#sourcePath").val();
        var outputFilename = $("#outputFileName").val();
        var startTime = $("#startTime").val();
        var duration = $("#duration").val();
        var frameRate = $("#frameRate").val();
        var outputDirectory = $("#outputDirectory").val();
        var presetPath = $("#presetPath").val();
		var outputXMP = $('input[type="radio"][name="outputXMP"]:checked').val();
        console.log("[Preset path]:%s", presetPath);
        var error = false;
        $("#startTransfer").attr("disabled", "disabled");
        transcodeEnabled = false;
        
        if (sourcePath == "")
        {
            $("#sourcePath").toggle( "highlight" );
            $("#sourcePath").toggle( "highlight" );
            error = true;
        }
    
        if (startTime == "")
        {
            $("#startTime").toggle( "highlight" );
            $("#startTime").toggle( "highlight" );
            error = true;
        }
        
        if (duration == "")
        {
            $("#duration").toggle( "highlight" );
            $("#duration").toggle( "highlight" );
            error = true;
        }
    
        if (frameRate == "")
        {
            $("#frameRate").toggle( "highlight" );
            $("#frameRate").toggle( "highlight" );
            error = true;
        }
    
        if (error == true)
        {
            $("#startTransfer").attr("disabled", "disabled");
            $("#progressbar" ).hide();
            transcodeEnabled = true;
            return;
        }
        
        $("#progressbar" ).show();
        
        var event = new CSEvent("com.adobe.browser.event.TranscodeRequest", "APPLICATION");
        taskID = newGuid();
        var msgID = newGuid();
    
        var messageXML = '<browserMessage><browserID ID="EABROWSER_SOURCE"/><taskID ID="'+taskID+'"/><msgID ID="'+msgID+'"/><presetPath>'+presetPath+'</presetPath><outputDirectory path="'+outputDirectory+'"/><outputXMP>' + outputXMP + '</outputXMP>'+'<transcodeItemList><transcodeItem><filePath path="'+sourcePath+'"/><outputFileName>'+outputFilename+'</outputFileName><frameRate>'+frameRate+'</frameRate><startTime>'+startTime+'</startTime><duration>'+duration+'</duration></transcodeItem></transcodeItemList></browserMessage>';
        
        console.log("[Send message to browser to start transcode]:%s", messageXML);
        event.data = messageXML;
        csInterface.dispatchEvent(event);
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
	}
    else
    {
        // do something such as providing a prompt
    }

}