function string_split(separator, limit)
{
    var res = new Array();
    var len = this.length;

    // special cases
    if (limit === 0)
    {
        return res;
    }

    if (separator === undefined)
    {
        res[0] = this;
        return res;
    }

    if (separator instanceof $rt_RegExp)
    {
        var start  = 0,
            string = this;

        while (true)
        {
            var pos = string.search(separator);
            if (pos === -1)
            {
                res.push(string);
                break;
            }

            res.push(string.substring(start, pos));
            string = string.substring(pos + 1, len);
        }

        return res;
    }

    var sep = separator + "";
    var this_blank = (len === 0);
    var sep_blank = (sep.length === 0);

    // special cases
    if (this_blank)
    {
        if (sep_blank)
            return res;

        res[0] = this;
        return res;
    }
    else if (sep_blank)
    {
        for (var i = 0; i < len; i ++)
            res[i] = this[i];

        return res;
    }

    var pos = this.indexOf(sep);
    var start = 0;
    var sepLen = sep.length;

    while (pos >= 0)
    {
        res.push(this.substring(start, pos));
        if (res.length === limit) return res;
        start = pos + sepLen;
        pos = this.indexOf(sep, pos + sepLen);
    }

    if (start <= len)
    {
        res.push(this.substring(start));
    }

    return res;
}