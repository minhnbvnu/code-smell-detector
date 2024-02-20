function sendMetadata()
{
    var event = new CSEvent("com.adobe.events.SendUnassociatedMetadata", "APPLICATION");
        
    var messageXML = '<unassociatedMetadataList><unassociatedMetadata><metadataID>'+$("#metadataID").val()+'</metadataID><xmp>'+$("#unassociatedMetadata").val()+'</xmp></unassociatedMetadata></unassociatedMetadataList>';
    console.log("[Send message to Prelude to send metadata]:%s", messageXML);
    event.data = messageXML;
    csInterface.dispatchEvent(event);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
}