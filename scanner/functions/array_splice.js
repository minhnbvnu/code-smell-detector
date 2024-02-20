function array_splice(start, deleteCount)
{
    var o = this;
    var len = o.length;

    if (start === undefined)
        start = len;
    else
    {
        if (start < 0)
        {
            start = len + start;
            if (start < 0)
                start = 0;
        }
        else if (start > len)
            start = len;
    }

    if (deleteCount === undefined)
        deleteCount = len - start;
    else
    {
        if (deleteCount < 0)
            deleteCount = 0;
        else if (deleteCount > len - start)
            deleteCount = len - start;
    }

    var itemCount = $argc - 2;

    if (itemCount < 0)
        itemCount = 0;

    var adj = itemCount - deleteCount;
    var deleteEnd = start + deleteCount;

    var result = o.slice(start, deleteEnd);

    if (adj < 0)
    {
        for (var i=deleteEnd; i<len; i++)
            o[i+adj] = o[i];
        o.length = len+adj;
    }
    else if (adj > 0)
    {
        for (var i=len-1; i>=deleteEnd; i--)
            o[i+adj] = o[i];
    }

    for (var i=itemCount-1; i>=0; i--)
        o[start+i] = $ir_get_arg(2+i);

    return result;
}