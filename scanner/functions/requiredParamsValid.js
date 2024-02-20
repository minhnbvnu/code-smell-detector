function requiredParamsValid()
{
    for(var i = 0; i< arguments.length; i++)
    {
        var argument = arguments[i];
        if(argument === undefined || argument === null)
        {
            return false;
        }
    }

    return true;
}