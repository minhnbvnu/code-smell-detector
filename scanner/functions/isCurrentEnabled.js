function isCurrentEnabled()
{
	if (currentSelection != '')
	{
		var cmd = "app.isCommandEnabled('" + currentSelection + "');";
		var csInterface = new CSInterface();
		csInterface.evalScript(cmd, function(result)
		{
			document.getElementById("button").disabled = (result != 'true');
			
			setTimeout(isCurrentEnabled, 3000);
		});
	}
}