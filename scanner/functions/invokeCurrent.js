function invokeCurrent()
{
	if (currentSelection != '')
	{
		var cmd = "app.invokeCommand('" + currentSelection + "');";
		var csInterface = new CSInterface();
		csInterface.evalScript(cmd);
	}
}