function fillList()
{
	initAppearance();
	
	//
	// retrieve application commands
	//
	var csInterface = new CSInterface();
	csInterface.evalScript('getCommandStr();', function(result)
	{
		try
		{
			//
			// The return value is a JSON string in the form
			//	
			//  [
			//  	{property : commandValue, value : commandID, label : commandLabel, help : commandDescription}
			//  	{property : commandValue, value : commandID, label : commandLabel, help : commandDescription}
			//  	{property : commandValue, value : commandID, label : commandLabel, help : commandDescription}
			//		:
			//		:
			//		:
			//  ]
			var cmds = eval(result);	
			var entries = '';
			
			for (var e=0; e<cmds.length; ++e)
			{
				entries += '<option value="' + cmds[e].value + '">' + cmds[e].label + '</option>';
				commands[cmds[e].value] = cmds[e].property;
				descriptions[cmds[e].value] = cmds[e].help;
			}
			
			document.getElementById('popup').innerHTML = entries;
			document.getElementById("popup").selectedIndex = "0";
			onSelected(document.getElementById("popup"));
		}
		catch(e)
		{
		}
	});  
}