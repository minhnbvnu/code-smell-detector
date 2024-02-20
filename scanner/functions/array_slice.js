function array_slice(start, end)
{
    var o = this;
    var len = o.length;

    if (start === undefined)
    {
        start = 0;
    }
    else
    {
        if (start < 0)
        {
            start = len + start;
            if (start < 0)
                start = 0;
        }
        else if (start > len)
        {
            start = len;
        }
    }

    if (end === undefined)
    {
        end = len;
    }
    else
    {
        if (end < 0)
        {
            end = len + end;
            if (end < start)
                end = start;
        }
        else if (end < start)
        {
            end = start;
        }
        else if (end > len)
        {
            end = len;
        }
    }

    var n = end - start;
    var a = new Array(n);

    for (var i=n-1; i>=0; i--)
        a[i] = o[start+i];

    return a;
}