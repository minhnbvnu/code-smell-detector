function showSliderPosition(value, isInput)
{
	var pos = parseFloat(value);
	
	if (!isNaN(pos))
	{
		var csInterface = new CSInterface();
		
		if (isInput)
		{
			csInterface.evalScript('setCTI(' + pos + ');', function(result)
			{
				sUpdate = true;
			});
		}
		else	
		{
			csInterface.evalScript('setCTI(' + pos + ');');
			sUpdate = false;
		}
	}
}