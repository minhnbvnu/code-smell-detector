function array_unshift()
{
    var o = this;
    var len = o.length;
    var argCount = arguments.length;

    if (argCount > 0)
    {
        for (var i=len-1; i>=0; i--)
            o[i+argCount] = o[i];
        for (var i=argCount-1; i>=0; i--)
            o[i] = arguments[i];
    }

    return len + argCount;
}