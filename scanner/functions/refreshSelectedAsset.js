function refreshSelectedAsset(event)
{
		var xmlContent = event.data;
		console.log("[Response to asset selected event], received data is: %s", xmlContent);
		
		var xmlDoc = createXMLDocObject(xmlContent);
		if (xmlDoc != null)
		{
			var selectedItemHTML = parseSelectedAsset(xmlDoc);
			$("#content").html(selectedItemHTML);
			$('#xmpcontent').val("");
			readXMPFromDisk();
			
			if (selectedItemInfoList.length==0)
			{
				$("#content").html("<h3>No Selection</h3>");
			}
			
			$("#content").accordion("refresh");
		}
		else
		{
			console.log("[Can not parse xml document]");
		}
		
		$("#result").html("");
}