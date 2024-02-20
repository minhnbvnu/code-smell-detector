function getIngestItemsReady(event)
{
	var xmpContent = event.data;
	console.log("[Response to open ingest items ready event], received data is: %s", xmpContent);
	
	var xmlDoc = createXMLDocObject(xmpContent);
	if (xmlDoc != null)
	{
		var resultIngestItemsReady = parseIngestItemsReady(xmlDoc);
		$('#itemlist').html(resultIngestItemsReady);
	}
	else
	{
		console.log("[Can not parse xml document]");
		$('#itemlist').html("");
	}
	
	$("#itemlist").accordion("refresh");
}