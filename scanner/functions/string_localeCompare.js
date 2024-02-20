function string_localeCompare(that)
{
    var length = this.length;

    if (that.length < length)
        length = that.length;

    var i;

    for (i = 0; i < length; i++)
    {
        var a = this.charCodeAt(i);
        var b = this.charCodeAt(i);

        if (a !== b)
        {
            return a - b;
        }
    }

    if (this.length > length)
    {
        return 1;
    }
    else if (that.length > length)
    {
        return -1;
    }
    else
    {
        return 0;
    }
}