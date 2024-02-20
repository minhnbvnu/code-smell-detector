function string_match(regexp)
{
    var re;

    if (regexp instanceof $rt_RegExp)
        re = regexp;
    else
        re = new $rt_RegExp(regexp);

    if (re.global)
    {
        var result = [];
        var match;
        var previousMatch;

        while (true)
        {
            match = re.exec(this);

            // Stop if no match left
            if (match === null)
                break;

            // Stop if we matched an empty string twice in a row (15.10.2.5 NOTE4)
            if (previousMatch && match[0].length === 0 && previousMatch[0].length === 0)
                break;

            result.push(match[0]);
            previousMatch = match;
        }

        if (result.length === 0)
            return null;

        return result;
    }
    else
    {
        return re.exec(this);
    }
}