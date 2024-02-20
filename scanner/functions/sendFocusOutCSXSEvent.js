function sendFocusOutCSXSEvent()
{
	var event = new CSEvent("com.adobe.events.TextFieldFocusOut", "APPLICATION");
	new CSInterface().dispatchEvent(event);
}