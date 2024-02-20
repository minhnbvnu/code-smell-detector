function applyMetadata()
{
    var event = new CSEvent("com.adobe.events.ApplyUnassociatedMetadata", "APPLICATION");
    
    var messageXML = '<unassociatedMetadataList><position>'+$("#position").val()+'</position><unassociatedMetadata><metadataID>'+$("#metadataID").val()+'</metadataID><xmp>'+$("#unassociatedMetadata").val()+'</xmp></unassociatedMetadata></unassociatedMetadataList>';
    console.log("[Send message to Prelude to apply metadata]:%s", messageXML);
    event.data = messageXML;
    csInterface.dispatchEvent(event);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
}