function array_concat()
{
    var o = this;
    var len = o.length;

    for (var i=arguments.length-1; i>=0; i--)
    {
        var x = arguments[i];

        len += (x instanceof Array) ? x.length : 1;
    }

    var a = new Array(len);

    for (var i=arguments.length-1; i>=0; i--)
    {
        var x = arguments[i];

        if (x instanceof Array)
        {
            for (var j=x.length-1; j>=0; j--)
                a[--len] = x[j];
        }
        else
        {
            a[--len] = x;
        }
    }

    for (var j=o.length-1; j>=0; j--)
        a[--len] = o[j];

    return a;
}