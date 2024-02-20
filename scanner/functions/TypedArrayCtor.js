function TypedArrayCtor(x)
    {
        var a = (x instanceof Array)? x:Array(x);
        a.subarray = Array.prototype.slice;
        return a;
    }