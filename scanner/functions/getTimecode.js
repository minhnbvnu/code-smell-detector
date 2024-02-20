function getTimecode(timeSec)
{
    function formatNumber(number)
    {
        var ret = number.toString();

        if (number < 10)
        {
            ret = '0' + ret;
        }
    
        return ret;
    }

	var timeMS = Number(timeSec) * 1000;
	var date = new Date(timeMS);
    
	var ret = formatNumber(date.getHours() - 1) + ':' + 
			  formatNumber(date.getMinutes()) + ':' + 
			  formatNumber(date.getSeconds()) + ':' + 
			  formatNumber(date.getMilliseconds());

	return ret;
}