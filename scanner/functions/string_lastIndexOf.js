function string_lastIndexOf(searchString, pos)
{
    if (searchString.length > this.length)
        return -1;

    if (pos === undefined)
        pos = this.length;
    else if (pos >= this.length)
        pos = this.length;
    else if (pos < 0)
        pos = 0;

    if (searchString.length === 0)
        return pos;

    if (pos + searchString.length > this.length)
        pos = this.length - searchString.length;

    var firstChar = searchString.charCodeAt(0);
    for (var i = pos; i >= 0; i--)
    {
        if (this.charCodeAt(i) === firstChar)
        {
            var match = true;
            for (var j = 1; j < searchString.length; j++)
            {
                if (this.charCodeAt(i + j) !== searchString.charCodeAt(j))
                {
                    match = false;
                    break;
                }
            }
            if (match) return i;
        }
    }

    return -1;
}