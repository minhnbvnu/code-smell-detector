function sendFocusInCSXSEvent()
{
	var event = new CSEvent("com.adobe.events.TextFieldFocusIn", "APPLICATION");
	new CSInterface().dispatchEvent(event);
}