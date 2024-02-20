function sendTagTemplate()
{
    var event = new CSEvent("com.adobe.browser.event.SendTagTemplate", "APPLICATION");
	var taskID = newGuid();
	var msgID = newGuid();
	var overwrite = $('input[type="radio"][name="overwrite"]:checked').val();

	var messageXML = '<browserMessage><browserID ID="MediaCollection"/><taskID ID="' + taskID + '"/><msgID ID="' + msgID + '"/><tagTemplateInfoList><tagTemplateInfo><tagTemplateInfoID>'+$("#tagTemplateID").val()+'</tagTemplateInfoID><tagTemplateInfoContent>'+$("#tagTemplate").val()+'</tagTemplateInfoContent></tagTemplateInfo>';
	if ($("#tagTemplateID2").val() != '')
	{
		messageXML += '<tagTemplateInfo><tagTemplateInfoID>'+$("#tagTemplateID2").val()+'</tagTemplateInfoID><tagTemplateInfoContent>'+$("#tagTemplate2").val()+'</tagTemplateInfoContent></tagTemplateInfo>';
	}
	messageXML += '</tagTemplateInfoList>';
	if (overwrite == "true")
	{
		messageXML += '<tagTemplateOption>Overwrite</tagTemplateOption>';
	}
	messageXML += '</browserMessage>';
    console.log("[Send message to Prelude to send metadata]:%s", messageXML);
    event.data = messageXML;
    csInterface.dispatchEvent(event);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
}