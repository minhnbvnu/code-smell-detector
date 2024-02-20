function getSystemPrefPathCallback(args)
{
	if (args) {		
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [getAppSystemPrefPath()] ***\n" + args + "\n\n");
		var o = document.getElementById("result");
		o.value = args;
	} else {
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [getAppSystemPrefPath()] ***\n" + "ERROR!!! \n\n");
	}
}